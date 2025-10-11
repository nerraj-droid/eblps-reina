<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\BusinessOwner;
use App\Models\BusinessType;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    public function run(): void
    {
        $businessOwners = BusinessOwner::all();
        $businessTypes = BusinessType::all();

        if ($businessOwners->isEmpty() || $businessTypes->isEmpty()) {
            return;
        }

        $businesses = [
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Sari-Sari Store')->first()->id,
                'business_name' => 'Juan\'s Sari-Sari Store',
                'business_name_arabic' => null,
                'business_description' => 'A small neighborhood store selling basic household items and snacks',
                'business_activity' => 'Retail of basic household goods',
                'business_address' => '123 Main Street, Poblacion',
                'business_barangay' => 'Poblacion',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456789',
                'business_email' => 'juans.store@email.com',
                'business_website' => null,
                'capital_investment' => 50000.00,
                'number_of_employees' => 2,
                'business_start_date' => '2023-01-15',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2023-001234',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Restaurant')->first()->id,
                'business_name' => 'Maria\'s Kitchen',
                'business_name_arabic' => null,
                'business_description' => 'A cozy restaurant serving Filipino and international cuisine',
                'business_activity' => 'Food service and restaurant operations',
                'business_address' => '456 Oak Avenue, Lahug',
                'business_barangay' => 'Lahug',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456790',
                'business_email' => 'marias.kitchen@email.com',
                'business_website' => 'www.mariaskitchen.com',
                'capital_investment' => 500000.00,
                'number_of_employees' => 8,
                'business_start_date' => '2022-06-01',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2022-005678',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Barbershop')->first()->id,
                'business_name' => 'Pedro\'s Barbershop',
                'business_name_arabic' => null,
                'business_description' => 'Traditional barbershop offering haircuts and grooming services',
                'business_activity' => 'Hair cutting and grooming services',
                'business_address' => '789 Pine Street, Mabolo',
                'business_barangay' => 'Mabolo',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456791',
                'business_email' => 'pedros.barbershop@email.com',
                'business_website' => null,
                'capital_investment' => 100000.00,
                'number_of_employees' => 3,
                'business_start_date' => '2023-03-10',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2023-002345',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Computer Shop')->first()->id,
                'business_name' => 'Ana\'s Cyber Cafe',
                'business_name_arabic' => null,
                'business_description' => 'Internet cafe and computer services for students and professionals',
                'business_activity' => 'Internet cafe and computer services',
                'business_address' => '321 Elm Street, Talamban',
                'business_barangay' => 'Talamban',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456792',
                'business_email' => 'anas.cyber@email.com',
                'business_website' => 'www.anascyber.com',
                'capital_investment' => 300000.00,
                'number_of_employees' => 4,
                'business_start_date' => '2022-11-20',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2022-007890',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Laundry Shop')->first()->id,
                'business_name' => 'Roberto\'s Laundry Service',
                'business_name_arabic' => null,
                'business_description' => 'Professional laundry and dry cleaning services',
                'business_activity' => 'Laundry and dry cleaning services',
                'business_address' => '654 Maple Drive, Banilad',
                'business_barangay' => 'Banilad',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456793',
                'business_email' => 'robertos.laundry@email.com',
                'business_website' => null,
                'capital_investment' => 200000.00,
                'number_of_employees' => 5,
                'business_start_date' => '2023-05-05',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2023-003456',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Bakery')->first()->id,
                'business_name' => 'Sweet Dreams Bakery',
                'business_name_arabic' => null,
                'business_description' => 'Artisanal bakery specializing in breads, pastries, and cakes',
                'business_activity' => 'Bread and pastry production and sales',
                'business_address' => '987 Cedar Lane, Poblacion',
                'business_barangay' => 'Poblacion',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456794',
                'business_email' => 'sweetdreams.bakery@email.com',
                'business_website' => 'www.sweetdreamsbakery.com',
                'capital_investment' => 400000.00,
                'number_of_employees' => 6,
                'business_start_date' => '2022-08-15',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2022-009012',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Grocery Store')->first()->id,
                'business_name' => 'Family Mart Grocery',
                'business_name_arabic' => null,
                'business_description' => 'Full-service grocery store with fresh produce and household items',
                'business_activity' => 'General merchandise retail store',
                'business_address' => '147 Birch Street, Lahug',
                'business_barangay' => 'Lahug',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456795',
                'business_email' => 'familymart.grocery@email.com',
                'business_website' => null,
                'capital_investment' => 800000.00,
                'number_of_employees' => 12,
                'business_start_date' => '2021-12-01',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2021-011234',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ],
            [
                'business_owner_id' => $businessOwners->random()->id,
                'business_type_id' => $businessTypes->where('name', 'Beauty Salon')->first()->id,
                'business_name' => 'Glamour Studio',
                'business_name_arabic' => null,
                'business_description' => 'Full-service beauty salon offering hair, nail, and makeup services',
                'business_activity' => 'Hair styling and beauty services',
                'business_address' => '258 Spruce Avenue, Mabolo',
                'business_barangay' => 'Mabolo',
                'business_city' => 'Cebu City',
                'business_province' => 'Cebu',
                'business_postal_code' => '6000',
                'business_phone' => '09123456796',
                'business_email' => 'glamour.studio@email.com',
                'business_website' => 'www.glamourstudio.com',
                'capital_investment' => 250000.00,
                'number_of_employees' => 7,
                'business_start_date' => '2023-02-14',
                'business_status' => 'active',
                'dti_registration_number' => 'DTI-2023-004567',
                'sec_registration_number' => null,
                'cooperative_registration_number' => null
            ]
        ];

        foreach ($businesses as $business) {
            Business::create($business);
        }
    }
}
