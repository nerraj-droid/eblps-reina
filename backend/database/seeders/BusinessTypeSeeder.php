<?php

namespace Database\Seeders;

use App\Models\BusinessType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BusinessTypeSeeder extends Seeder
{
    public function run(): void
    {
        $businessTypes = [
            [
                'name' => 'Sari-Sari Store',
                'description' => 'Small retail store selling basic household items',
                'fee' => 500.00,
                'is_active' => true
            ],
            [
                'name' => 'Restaurant',
                'description' => 'Food service establishment',
                'fee' => 2000.00,
                'is_active' => true
            ],
            [
                'name' => 'Barbershop',
                'description' => 'Hair cutting and grooming services',
                'fee' => 800.00,
                'is_active' => true
            ],
            [
                'name' => 'Computer Shop',
                'description' => 'Internet cafe and computer services',
                'fee' => 1500.00,
                'is_active' => true
            ],
            [
                'name' => 'Laundry Shop',
                'description' => 'Laundry and dry cleaning services',
                'fee' => 1200.00,
                'is_active' => true
            ],
            [
                'name' => 'Bakery',
                'description' => 'Bread and pastry production and sales',
                'fee' => 1800.00,
                'is_active' => true
            ],
            [
                'name' => 'Gas Station',
                'description' => 'Fuel retail and automotive services',
                'fee' => 5000.00,
                'is_active' => true
            ],
            [
                'name' => 'Grocery Store',
                'description' => 'General merchandise retail store',
                'fee' => 3000.00,
                'is_active' => true
            ],
            [
                'name' => 'Hardware Store',
                'description' => 'Construction materials and tools retail',
                'fee' => 2500.00,
                'is_active' => true
            ],
            [
                'name' => 'Beauty Salon',
                'description' => 'Hair styling and beauty services',
                'fee' => 1000.00,
                'is_active' => true
            ]
        ];

        foreach ($businessTypes as $type) {
            BusinessType::create($type);
        }
    }
}
