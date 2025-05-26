<?php

namespace App\Http\Controllers;

use App\Mail\AdminNotificationMail;
use App\Models\Child;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ParentDashBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user(); // or Auth::user()

        if ($user->role !== 'parent') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $children = $user->children; // Assuming the User model has a children() relationship

        return response()->json([
            'children' => $children,
        ]);
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'lrn_or_student_id' => 'required|string|max:50|unique:children,lrn_or_student_id',
        ]);

        $user = Auth::user();

        $child = Child::create([
            'user_id' => $user->id, // assuming the relationship
            'name' => $validated['name'],
            'date_of_birth' => $validated['date_of_birth'],
            'lrn_or_student_id' => $validated['lrn_or_student_id'],
        ]);

        Mail::to(config('mail.admin_address'))->send(new AdminNotificationMail($user, [$child]));

        return response()->json(['child' => $child], 201);
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
        $request->validate([
            'child_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'lrn_or_student_id' => 'required|string|max:100|distinct',
        ]);

        $child = Child::find($id);

        if (!$child) {
            return response()->json(['message' => 'Child not found'], 404);
        }

        $user = Auth::user();

        if (!$user || $child->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $child->name = $request->child_name;
        $child->date_of_birth = $request->date_of_birth;
        $child->lrn_or_student_id = $request->lrn_or_student_id;
        $child->save();

        return response()->json(['message' => 'Child updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $child = Child::where('id', $id)->where('user_id', $user->id)->first();

        if (!$child) {
            return response()->json(['message' => 'Child not found or unauthorized'], 404);
        }

        $child->delete();

        return response()->json(['message' => 'Child deleted successfully']);
    }

}
