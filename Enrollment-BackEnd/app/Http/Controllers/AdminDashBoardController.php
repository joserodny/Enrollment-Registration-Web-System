<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\User;
use Illuminate\Http\Request;
use Rap2hpoutre\FastExcel\FastExcel;

class AdminDashBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = User::where('role', 'parent')->with('children');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('contact_number', 'like', "%{$search}%")
                ->orWhereHas('children', function($q2) use ($search) {
                    $q2->where('name', 'like', "%{$search}%")
                        ->orWhere('lrn_or_student_id', 'like', "%{$search}%");
                });
            });
        }

        $enrollees = $query->get();

        return response()->json(['enrollees' => $enrollees]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function exportEnrollees()
    {
        function enrolleesGenerator() {
            foreach (Child::with('parent')->cursor() as $child) {
                $parent = $child->parent;
                yield [
                    'Parent Name' => $parent->name ?? '',
                    'Child Name' => $child->name ?? '',
                    'Birthday' => $child->date_of_birth?->format('Y-m-d') ?? '',
                    'LRN/Student ID' => $child->lrn_or_student_id ?? '',
                    'Relationship' => $parent->relationship ?? '',
                    'Contact Number' => $parent->contact_number ?? '',
                    'Email' => $parent->email ?? ''
                ];
            }
        }

        return (new FastExcel(enrolleesGenerator()))->download('enrollees.csv');
    }
}
