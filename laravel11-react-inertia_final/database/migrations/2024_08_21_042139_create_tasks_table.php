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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('image_path')->nullable();            
            $table->string('status');
            $table->string('priority');
            $table->timestamp('due_date')->nullable();
            // $table->foreignId('assigned_user_id')->constrained('users');
            // $table->foreignId('created_by')->constrained('users');
            // $table->foreignId('updated_by')->constrained('users');
            // $table->foreignId('project_id')->constrained('projects');
            // Allowing foreign key to set null if the user is deleted
            $table->foreignId('assigned_user_id')->nullable()->constrained('users')->onDelete('set null');
            
            // Allowing foreign key to set null if the user is deleted (for creator)
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            
            // Allowing foreign key to set null if the user is deleted (for updater)
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            
            // Foreign key for project (still cascading deletion of tasks when project is deleted)
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
