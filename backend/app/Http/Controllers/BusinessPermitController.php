<?php

namespace App\Http\Controllers;

use App\Http\Requests\BusinessPermitRegistrationRequest;
use App\Models\Business;
use App\Models\BusinessDocument;
use App\Models\BusinessLine;
use App\Models\BusinessOwner;
use App\Models\BusinessPermit;
use App\Models\BusinessType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BusinessPermitController extends Controller
{
    public function index(Request $request)
    {
        $query = BusinessPermit::with(['business.businessOwner', 'business.businessType', 'business.businessLines'])
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

            // Handle FormData if it contains JSON data
            if ($request->has('data')) {
                $jsonData = json_decode($request->input('data'), true);
                $request->merge($jsonData);
            }

            $validatedData = $request->validated();
            $ownerData = $validatedData['owner'];
            $businessData = $validatedData['business'];
            $permitData = $validatedData['permit'];
            $businessLinesData = $validatedData['business_lines'] ?? [];
            $documentsData = $validatedData['documents'] ?? [];

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

            // Create business lines if provided
            if (!empty($businessLinesData)) {
                foreach ($businessLinesData as $lineData) {
                    if (!empty($lineData['line_of_business'])) {
                        BusinessLine::create([
                            'business_id' => $business->id,
                            'line_of_business' => $lineData['line_of_business'],
                            'psic_code' => $lineData['psic_code'] ?? ''
                        ]);
                    }
                }
            }

            // Handle document uploads if provided
            if (!empty($documentsData)) {
                foreach ($documentsData as $index => $documentData) {
                    if ($request->hasFile("documents.{$index}.file")) {
                        $file = $request->file("documents.{$index}.file");

                        // Generate unique filename
                        $filename = time() . '_' . $file->getClientOriginalName();
                        $path = $file->storeAs('business_documents', $filename, 'public');

                        BusinessDocument::create([
                            'business_permit_id' => $businessPermit->id,
                            'document_type' => $documentData['document_type'],
                            'document_name' => $file->getClientOriginalName(),
                            'file_path' => $path,
                            'file_size' => $file->getSize(),
                            'mime_type' => $file->getMimeType(),
                            'is_required' => $this->isDocumentRequired($documentData['document_type']),
                            'is_uploaded' => true,
                            'description' => $documentData['description'] ?? null
                        ]);
                    }
                }
            }

            $businessPermit->load(['business.businessOwner', 'business.businessType', 'business.businessLines', 'businessDocuments']);

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

    /**
     * Determine if a document type is required
     */
    private function isDocumentRequired(string $documentType): bool
    {
        $requiredDocuments = [
            'valid_id',
            'dti_registration',
            'contract_lease',
            'fire_safety_certificate'
        ];

        return in_array($documentType, $requiredDocuments);
    }

    /**
     * Serve a document file via API
     */
    public function serveDocument(Request $request, string $filename)
    {
        try {
            // Find the document by filename
            $document = BusinessDocument::where('file_path', 'like', '%' . $filename)->first();

            if (!$document) {
                return response()->json(['error' => 'Document not found'], 404);
            }

            // Get the full file path
            $filePath = storage_path('app/public/' . $document->file_path);

            if (!file_exists($filePath)) {
                return response()->json(['error' => 'File not found on disk'], 404);
            }

            // Return the file with appropriate headers
            return response()->file($filePath, [
                'Content-Type' => $document->mime_type,
                'Content-Disposition' => 'inline; filename="' . $document->document_name . '"',
                'Cache-Control' => 'private, max-age=3600'
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error serving file: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get all documents for a specific business permit
     */
    public function getPermitDocuments(Request $request, string $permitId)
    {
        try {
            $permit = BusinessPermit::findOrFail($permitId);
            $documents = $permit->businessDocuments()->get();

            $documentsData = $documents->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'document_type' => $doc->document_type,
                    'document_name' => $doc->document_name,
                    'file_size' => $doc->file_size,
                    'human_readable_file_size' => $doc->human_readable_file_size,
                    'mime_type' => $doc->mime_type,
                    'is_required' => $doc->is_required,
                    'is_uploaded' => $doc->is_uploaded,
                    'description' => $doc->description,
                    'download_url' => url('/api/files/business-documents/' . basename($doc->file_path)),
                    'created_at' => $doc->created_at,
                    'updated_at' => $doc->updated_at
                ];
            });

            return response()->json([
                'data' => $documentsData,
                'message' => 'Documents retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error retrieving documents: ' . $e->getMessage()], 500);
        }
    }
}
