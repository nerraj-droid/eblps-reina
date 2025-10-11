<?php

namespace Database\Seeders;

use App\Models\BusinessOwner;
use Illuminate\Database\Seeder;

class BusinessOwnerSeeder extends Seeder
{
    public function run(): void
    {
        $businessOwners = [
            [
                'first_name' => 'Juan',
                'last_name' => 'Dela Cruz',
                'middle_name' => 'Santos',
                'email' => 'juan.delacruz@email.com',
                'phone' => '09123456789',
                'birth_date' => '1985-03-15',
                'gender' => 'male',
                'nationality' => 'Filipino',
                'civil_status' => 'married',
                'address' => '123 Main Street',
                'barangay' => 'Poblacion',
                'city' => 'Cebu City',
                'province' => 'Cebu',
                'postal_code' => '6000',
                'tin_number' => '123-456-789-000',
                'sss_number' => '12-3456789-0',
                'philhealth_number' => '12-345678901-2',
                'pagibig_number' => '1234-5678-9012'
            ],
            [
                'first_name' => 'Maria',
                'last_name' => 'Santos',
                'middle_name' => 'Garcia',
                'email' => 'maria.santos@email.com',
                'phone' => '09123456790',
                'birth_date' => '1990-07-22',
                'gender' => 'female',
                'nationality' => 'Filipino',
                'civil_status' => 'single',
                'address' => '456 Oak Avenue',
                'barangay' => 'Lahug',
                'city' => 'Cebu City',
                'province' => 'Cebu',
                'postal_code' => '6000',
                'tin_number' => '234-567-890-000',
                'sss_number' => '23-4567890-1',
                'philhealth_number' => '23-456789012-3',
                'pagibig_number' => '2345-6789-0123'
            ],
            [
                'first_name' => 'Pedro',
                'last_name' => 'Reyes',
                'middle_name' => 'Lopez',
                'email' => 'pedro.reyes@email.com',
                'phone' => '09123456791',
                'birth_date' => '1978-11-08',
                'gender' => 'male',
                'nationality' => 'Filipino',
                'civil_status' => 'married',
                'address' => '789 Pine Street',
                'barangay' => 'Mabolo',
                'city' => 'Cebu City',
                'province' => 'Cebu',
                'postal_code' => '6000',
                'tin_number' => '345-678-901-000',
                'sss_number' => '34-5678901-2',
                'philhealth_number' => '34-567890123-4',
                'pagibig_number' => '3456-7890-1234'
            ],
            [
                'first_name' => 'Ana',
                'last_name' => 'Cruz',
                'middle_name' => 'Mendoza',
                'email' => 'ana.cruz@email.com',
                'phone' => '09123456792',
                'birth_date' => '1992-05-12',
                'gender' => 'female',
                'nationality' => 'Filipino',
                'civil_status' => 'single',
                'address' => '321 Elm Street',
                'barangay' => 'Talamban',
                'city' => 'Cebu City',
                'province' => 'Cebu',
                'postal_code' => '6000',
                'tin_number' => '456-789-012-000',
                'sss_number' => '45-6789012-3',
                'philhealth_number' => '45-678901234-5',
                'pagibig_number' => '4567-8901-2345'
            ],
            [
                'first_name' => 'Roberto',
                'last_name' => 'Gonzales',
                'middle_name' => 'Fernandez',
                'email' => 'roberto.gonzales@email.com',
                'phone' => '09123456793',
                'birth_date' => '1988-09-30',
                'gender' => 'male',
                'nationality' => 'Filipino',
                'civil_status' => 'married',
                'address' => '654 Maple Drive',
                'barangay' => 'Banilad',
                'city' => 'Cebu City',
                'province' => 'Cebu',
                'postal_code' => '6000',
                'tin_number' => '567-890-123-000',
                'sss_number' => '56-7890123-4',
                'philhealth_number' => '56-789012345-6',
                'pagibig_number' => '5678-9012-3456'
            ]
        ];

        foreach ($businessOwners as $owner) {
            BusinessOwner::create($owner);
        }
    }
}
