<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            // Business address details
            $table->string('house_number')->nullable();
            $table->string('building_name')->nullable();
            $table->string('lot_number')->nullable();
            $table->string('block_number')->nullable();
            $table->string('street')->nullable();
            $table->string('subdivision')->nullable();

            // Employee details
            $table->integer('male_employees')->default(0);
            $table->integer('female_employees')->default(0);
            $table->integer('residing_employees')->default(0);

            // Vehicle counts
            $table->integer('van_count')->default(0);
            $table->integer('truck_count')->default(0);
            $table->integer('motorcycle_count')->default(0);

            // Business area
            $table->decimal('business_area', 10, 2)->nullable();

            // Business hours/days
            $table->string('business_hours')->nullable();
            $table->string('business_days')->nullable();

            // Business activity flags
            $table->boolean('main_office')->default(false);
            $table->boolean('branch_office')->default(false);
            $table->boolean('admin_office_only')->default(false);
            $table->boolean('warehouse')->default(false);
            $table->boolean('others_activity')->default(false);

            // Trade name
            $table->string('trade_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn([
                'house_number',
                'building_name',
                'lot_number',
                'block_number',
                'street',
                'subdivision',
                'male_employees',
                'female_employees',
                'residing_employees',
                'van_count',
                'truck_count',
                'motorcycle_count',
                'business_area',
                'business_hours',
                'business_days',
                'main_office',
                'branch_office',
                'admin_office_only',
                'warehouse',
                'others_activity',
                'trade_name'
            ]);
        });
    }
};
