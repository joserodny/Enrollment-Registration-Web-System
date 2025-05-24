<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'date_of_birth',
        'lrn_or_student_id',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function parent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
