<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PsicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (\App\Models\Psic::count() > 0) {
            $this->command->info('PSIC data already exists. Skipping...');
            return;
        }

        $json = file_get_contents(database_path('../project_resources/pcis.json'));
        $data = json_decode($json, true);
        $psics = array_map(function ($item) {
            return [
                'code' => $item['Subclass Code'],
                'description' => $item['Subclass Description'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $data);
        \DB::table('psics')->insert($psics);
    }
}
