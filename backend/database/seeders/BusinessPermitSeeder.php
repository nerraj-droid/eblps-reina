<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessPermit;
use App\Models\BusinessType;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BusinessPermitSeeder extends Seeder
{
    public function run(): void
    {
        $businesses = Business::all();
        $businessTypes = BusinessType::all();

        if ($businesses->isEmpty()) {
            return;
        }

        $permitTypes = ['new', 'renewal', 'amendment'];
        $statuses = ['pending', 'approved', 'rejected', 'expired', 'cancelled'];
        $requiredDocuments = [
            'Barangay Clearance',
            'DTI Registration',
            'Mayor\'s Permit',
            'BIR Registration',
            'SSS Registration',
            'PhilHealth Registration',
            'Pag-IBIG Registration',
            'Business Plan',
            'Financial Statements',
            'Lease Contract or Property Title'
        ];

        $submittedDocuments = [
            'Barangay Clearance',
            'DTI Registration',
            'BIR Registration',
            'SSS Registration',
            'PhilHealth Registration',
            'Pag-IBIG Registration'
        ];

        foreach ($businesses as $business) {
            $businessType = $businessTypes->find($business->business_type_id);
            $baseFee = $businessType ? $businessType->fee : 1000.00;
            
            $permitType = $permitTypes[array_rand($permitTypes)];
            $status = $statuses[array_rand($statuses)];
            
            $applicationDate = Carbon::now()->subDays(rand(1, 365));
            $validFrom = $applicationDate->copy()->addDays(rand(1, 30));
            $validUntil = $validFrom->copy()->addYear();
            
            $penaltyFee = 0;
            if ($status === 'expired' || $validUntil->isPast()) {
                $penaltyFee = $baseFee * 0.25;
            }
            
            $totalAmount = $baseFee + $penaltyFee;
            
            $approvedBy = null;
            $approvedAt = null;
            $rejectionReason = null;
            
            if ($status === 'approved') {
                $approvedBy = 'City Administrator';
                $approvedAt = $validFrom->copy()->subDays(rand(1, 7));
            } elseif ($status === 'rejected') {
                $rejectionReason = 'Incomplete documentation. Please submit all required documents.';
            }

            $permitNumber = $this->generatePermitNumber($applicationDate);

            BusinessPermit::create([
                'business_id' => $business->id,
                'permit_number' => $permitNumber,
                'permit_type' => $permitType,
                'application_date' => $applicationDate,
                'valid_from' => $validFrom,
                'valid_until' => $validUntil,
                'status' => $status,
                'total_fee' => $baseFee,
                'penalty_fee' => $penaltyFee,
                'total_amount' => $totalAmount,
                'remarks' => $this->generateRemarks($permitType, $status),
                'approved_by' => $approvedBy,
                'approved_at' => $approvedAt,
                'rejection_reason' => $rejectionReason,
                'required_documents' => $requiredDocuments,
                'submitted_documents' => $status === 'approved' ? $submittedDocuments : array_slice($submittedDocuments, 0, rand(3, 6))
            ]);

            if ($permitType === 'renewal' && $status === 'approved') {
                $renewalApplicationDate = $validUntil->copy()->subDays(rand(30, 60));
                $renewalValidFrom = $validUntil->copy()->addDay();
                $renewalValidUntil = $renewalValidFrom->copy()->addYear();
                
                $renewalPermitNumber = $this->generatePermitNumber($renewalApplicationDate);
                
                BusinessPermit::create([
                    'business_id' => $business->id,
                    'permit_number' => $renewalPermitNumber,
                    'permit_type' => 'renewal',
                    'application_date' => $renewalApplicationDate,
                    'valid_from' => $renewalValidFrom,
                    'valid_until' => $renewalValidUntil,
                    'status' => 'approved',
                    'total_fee' => $baseFee,
                    'penalty_fee' => 0,
                    'total_amount' => $baseFee,
                    'remarks' => 'Renewal application processed successfully',
                    'approved_by' => 'City Administrator',
                    'approved_at' => $renewalValidFrom->copy()->subDays(rand(1, 5)),
                    'rejection_reason' => null,
                    'required_documents' => $requiredDocuments,
                    'submitted_documents' => $submittedDocuments
                ]);
            }
        }
    }

    private function generatePermitNumber(Carbon $date): string
    {
        $year = $date->format('Y');
        $month = $date->format('m');
        $count = BusinessPermit::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count() + 1;
        
        $permitNumber = 'BP-' . $year . $month . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
        
        while (BusinessPermit::where('permit_number', $permitNumber)->exists()) {
            $count++;
            $permitNumber = 'BP-' . $year . $month . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
        }
        
        return $permitNumber;
    }

    private function generateRemarks(string $permitType, string $status): string
    {
        $remarks = [
            'new' => [
                'pending' => 'New business permit application under review',
                'approved' => 'New business permit approved and issued',
                'rejected' => 'New business permit application rejected',
                'expired' => 'New business permit application expired',
                'cancelled' => 'New business permit application cancelled by applicant'
            ],
            'renewal' => [
                'pending' => 'Business permit renewal application under review',
                'approved' => 'Business permit renewal approved and issued',
                'rejected' => 'Business permit renewal application rejected',
                'expired' => 'Business permit renewal application expired',
                'cancelled' => 'Business permit renewal application cancelled by applicant'
            ],
            'amendment' => [
                'pending' => 'Business permit amendment application under review',
                'approved' => 'Business permit amendment approved and issued',
                'rejected' => 'Business permit amendment application rejected',
                'expired' => 'Business permit amendment application expired',
                'cancelled' => 'Business permit amendment application cancelled by applicant'
            ]
        ];

        return $remarks[$permitType][$status] ?? 'Business permit application processed';
    }
}
