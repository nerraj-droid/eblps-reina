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
        Schema::create('business_owners', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('email')->unique();
            $table->string('phone');
            $table->date('birth_date');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('nationality')->default('Filipino');
            $table->string('civil_status');
            $table->text('address');
            $table->string('barangay');
            $table->string('city');
            $table->string('province');
            $table->string('postal_code');
            $table->string('tin_number')->nullable();
            $table->string('sss_number')->nullable();
            $table->string('philhealth_number')->nullable();
            $table->string('pagibig_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_owners');
    }
};
