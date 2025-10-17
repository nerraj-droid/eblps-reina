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
        Schema::create('business_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_permit_id')->constrained()->onDelete('cascade');
            $table->string('document_type'); // e.g., 'valid_id', 'dti_registration', 'contract_lease', etc.
            $table->string('document_name'); // Original filename
            $table->string('file_path'); // Storage path
            $table->string('file_size'); // File size in bytes
            $table->string('mime_type'); // File MIME type
            $table->boolean('is_required')->default(false);
            $table->boolean('is_uploaded')->default(false);
            $table->text('description')->nullable(); // Document description
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_documents');
    }
};
