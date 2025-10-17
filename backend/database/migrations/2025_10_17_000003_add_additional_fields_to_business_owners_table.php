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
        Schema::table('business_owners', function (Blueprint $table) {
            // Name fields
            $table->string('suffix')->nullable();

            // Taxpayer address
            $table->text('taxpayer_address')->nullable();
            $table->string('taxpayer_barangay')->nullable();
            $table->string('taxpayer_city')->nullable();
            $table->string('taxpayer_province')->nullable();
            $table->string('taxpayer_postal_code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_owners', function (Blueprint $table) {
            $table->dropColumn([
                'suffix',
                'taxpayer_address',
                'taxpayer_barangay',
                'taxpayer_city',
                'taxpayer_province',
                'taxpayer_postal_code'
            ]);
        });
    }
};
