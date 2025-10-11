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
        Schema::create('business_permits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->onDelete('cascade');
            $table->string('permit_number')->unique();
            $table->enum('permit_type', ['new', 'renewal', 'amendment']);
            $table->date('application_date');
            $table->date('valid_from');
            $table->date('valid_until');
            $table->enum('status', ['pending', 'approved', 'rejected', 'expired', 'cancelled'])->default('pending');
            $table->decimal('total_fee', 10, 2)->default(0);
            $table->decimal('penalty_fee', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->text('remarks')->nullable();
            $table->string('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->json('required_documents')->nullable();
            $table->json('submitted_documents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_permits');
    }
};
