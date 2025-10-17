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
        Schema::table('business_permits', function (Blueprint $table) {
            // Ownership
            $table->boolean('owned')->default(false);
            $table->text('property_description')->nullable();
            $table->decimal('property_value', 15, 2)->nullable();
            $table->string('tax_declaration_no')->nullable();
            $table->decimal('monthly_rental', 10, 2)->nullable();

            // Lessor info
            $table->string('lessor_surname')->nullable();
            $table->string('lessor_given_name')->nullable();
            $table->string('lessor_middle_name')->nullable();
            $table->string('lessor_suffix')->nullable();

            // Tax incentives
            $table->boolean('tax_incentives')->default(false);

            // Location
            $table->decimal('location_latitude', 10, 8)->nullable();
            $table->decimal('location_longitude', 11, 8)->nullable();
            $table->string('location_search')->nullable();

            // Application type
            $table->string('application_type')->nullable();
            $table->string('payment_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_permits', function (Blueprint $table) {
            $table->dropColumn([
                'owned',
                'property_description',
                'property_value',
                'tax_declaration_no',
                'monthly_rental',
                'lessor_surname',
                'lessor_given_name',
                'lessor_middle_name',
                'lessor_suffix',
                'tax_incentives',
                'location_latitude',
                'location_longitude',
                'location_search',
                'application_type',
                'payment_type'
            ]);
        });
    }
};
