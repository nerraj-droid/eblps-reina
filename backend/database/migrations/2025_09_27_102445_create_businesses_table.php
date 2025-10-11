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
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_owner_id')->constrained()->onDelete('cascade');
            $table->foreignId('business_type_id')->constrained()->onDelete('cascade');
            $table->string('business_name');
            $table->string('business_name_arabic')->nullable();
            $table->text('business_description');
            $table->string('business_activity');
            $table->text('business_address');
            $table->string('business_barangay');
            $table->string('business_city');
            $table->string('business_province');
            $table->string('business_postal_code');
            $table->string('business_phone');
            $table->string('business_email');
            $table->string('business_website')->nullable();
            $table->decimal('capital_investment', 15, 2);
            $table->integer('number_of_employees');
            $table->date('business_start_date');
            $table->enum('business_status', ['active', 'inactive', 'suspended', 'closed'])->default('active');
            $table->string('dti_registration_number')->nullable();
            $table->string('sec_registration_number')->nullable();
            $table->string('cooperative_registration_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
