<?php

namespace App\Http\Controllers;

use App\Models\Psic;
use Illuminate\Http\Request;

class PsicController extends Controller
{
    public function index(Request $request)
    {
        $query = Psic::query();

        // Handle search
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('code', 'like', '%' . $searchTerm . '%')
                  ->orWhere('description', 'like', '%' . $searchTerm . '%');
            });
        }

        // Handle pagination
        $perPage = $request->get('per_page', 50);
        $psics = $query->orderBy('code')->paginate($perPage);

        return response()->json([
            'data' => $psics->items(),
            'meta' => [
                'current_page' => $psics->currentPage(),
                'last_page' => $psics->lastPage(),
                'per_page' => $psics->perPage(),
                'total' => $psics->total(),
            ],
            'message' => 'PSIC codes retrieved successfully'
        ]);
    }

    public function show(Psic $psic)
    {
        return response()->json([
            'data' => $psic,
            'message' => 'PSIC code retrieved successfully'
        ]);
    }

    public function search(Request $request)
    {
        $searchTerm = $request->get('q', '');

        if (strlen($searchTerm) < 2) {
            return response()->json([
                'data' => [],
                'message' => 'Search term must be at least 2 characters'
            ]);
        }

        $psics = Psic::where(function ($q) use ($searchTerm) {
            $q->where('code', 'like', '%' . $searchTerm . '%')
              ->orWhere('description', 'like', '%' . $searchTerm . '%');
        })
        ->orderBy('code')
        ->limit(20)
        ->get();

        return response()->json([
            'data' => $psics,
            'message' => 'PSIC search results retrieved successfully'
        ]);
    }
}
