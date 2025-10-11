<?php

namespace App\Http\Controllers;

use App\Http\Requests\BusinessPermitRegistrationRequest;
use App\Models\Business;
use App\Models\BusinessOwner;
use App\Models\BusinessPermit;
use App\Models\BusinessType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BusinessPermitController extends Controller
{
    public function index(Request $request)
    {
        $query = BusinessPermit::with(['business.businessOwner', 'business.businessType'])
            ->orderBy('created_at', 'desc');

        // Handle search
        if ($request->has('search') && $request->search) {
            $query->whereHas('business', function ($q) use ($request) {
                $q->where('business_name', 'like', '%' . $request->search . '%')
                  ->orWhere('permit_number', 'like', '%' . $request->search . '%');
            });
        }

        // Handle status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $businessPermits = $query->paginate(15);

        // Return JSON for API requests
        if ($request->expectsJson()) {
            return response()->json([
                'data' => $businessPermits->items(),
                'meta' => [
                    'current_page' => $businessPermits->currentPage(),
                    'last_page' => $businessPermits->lastPage(),
                    'per_page' => $businessPermits->perPage(),
                    'total' => $businessPermits->total(),
                ],
                'message' => 'Business permits retrieved successfully'
            ]);
        }

        return view('business-permits.index', compact('businessPermits'));
    }

    public function create()
    {
        $businessTypes = BusinessType::where('is_active', true)->get();
        return view('business-permits.create', compact('businessTypes'));
    }

    public function store(BusinessPermitRegistrationRequest $request)
    {
        try {
            DB::beginTransaction();

            $ownerData = $request->validated()['owner'];
            $businessData = $request->validated()['business'];
            $permitData = $request->validated()['permit'];

            $businessOwner = BusinessOwner::create($ownerData);

            $businessData['business_owner_id'] = $businessOwner->id;
            $business = Business::create($businessData);

            $permitData['business_id'] = $business->id;
            $permitData['application_date'] = now()->toDateString();
            $permitData['permit_number'] = (new BusinessPermit())->generatePermitNumber();
            
            $businessType = BusinessType::find($businessData['business_type_id']);
            $permitData['total_fee'] = $businessType->fee;
            $permitData['total_amount'] = $businessType->fee;

            $businessPermit = BusinessPermit::create($permitData);
            $businessPermit->load(['business.businessOwner', 'business.businessType']);

            DB::commit();

            // Return JSON for API requests
            if ($request->expectsJson()) {
                return response()->json([
                    'data' => $businessPermit,
                    'message' => 'Business permit application submitted successfully!'
                ], 201);
            }

            return redirect()->route('business-permits.show', $businessPermit)
                ->with('success', 'Business permit application submitted successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Return JSON for API requests
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'An error occurred while processing your application. Please try again.',
                    'error' => $e->getMessage()
                ], 500);
            }
            
            return back()->withInput()
                ->with('error', 'An error occurred while processing your application. Please try again.');
        }
    }

    public function show(Request $request, BusinessPermit $businessPermit)
    {
        $businessPermit->load(['business.businessOwner', 'business.businessType']);
        
        // Return JSON for API requests
        if ($request->expectsJson()) {
            return response()->json([
                'data' => $businessPermit,
                'message' => 'Business permit retrieved successfully'
            ]);
        }
        
        return view('business-permits.show', compact('businessPermit'));
    }

    public function edit(BusinessPermit $businessPermit)
    {
        $businessTypes = BusinessType::where('is_active', true)->get();
        $businessPermit->load(['business.businessOwner', 'business.businessType']);
        return view('business-permits.edit', compact('businessPermit', 'businessTypes'));
    }

    public function update(BusinessPermitRegistrationRequest $request, BusinessPermit $businessPermit)
    {
        try {
            DB::beginTransaction();

            $ownerData = $request->validated()['owner'];
            $businessData = $request->validated()['business'];
            $permitData = $request->validated()['permit'];

            $businessPermit->business->businessOwner->update($ownerData);
            $businessPermit->business->update($businessData);
            $businessPermit->update($permitData);

            DB::commit();

            return redirect()->route('business-permits.show', $businessPermit)
                ->with('success', 'Business permit application updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withInput()
                ->with('error', 'An error occurred while updating your application. Please try again.');
        }
    }

    public function destroy(BusinessPermit $businessPermit)
    {
        $businessPermit->delete();
        return redirect()->route('business-permits.index')
            ->with('success', 'Business permit application deleted successfully!');
    }

    public function approve(Request $request, BusinessPermit $businessPermit)
    {
        $request->validate([
            'approved_by' => 'required|string|max:255',
            'remarks' => 'nullable|string|max:1000'
        ]);

        $businessPermit->update([
            'status' => 'approved',
            'approved_by' => $request->approved_by,
            'approved_at' => now(),
            'remarks' => $request->remarks
        ]);

        return redirect()->route('business-permits.show', $businessPermit)
            ->with('success', 'Business permit approved successfully!');
    }

    public function reject(Request $request, BusinessPermit $businessPermit)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:1000'
        ]);

        $businessPermit->update([
            'status' => 'rejected',
            'rejection_reason' => $request->rejection_reason
        ]);

        return redirect()->route('business-permits.show', $businessPermit)
            ->with('success', 'Business permit rejected.');
    }
}
