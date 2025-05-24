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
        Schema::table('users', function (Blueprint $table) {
            $table->string('relationship')->nullable()->after('email');
            $table->string('contact_number')->after('relationship');
            $table->string('role')->default('parent')->after('contact_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->drop('relationship')->after('email');
            $table->drop('contact_number')->after('relationship');
            $table->drop('role')->default('parent')->after('contact_number');
        });
    }
};
