<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('login')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'parent_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'contact_number' => 'required|string|max:15',

            'child_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'lrn_or_student_id' => 'required|string|max:255',
            'relationship' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->parent_name,
            'email' => $request->email,
            'password' => null,
            'contact_number' => $request->contact_number,
        ]);

        $child = Child::create([
            'name' => $request->child_name,
            'date_of_birth' => $request->date_of_birth,
            'lrn_or_student_id' => $request->lrn_or_student_id,
            'relationship' => $request->relationship,
            'user_id' => $user->id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Successfully registered for enrollment.',
            'user' => $user,
            'child' => $child,
            'token' => $token,
        ]);

    }


    public function logout(Request $request)
    {
        // Revoke the current user token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function authenticatedUser(Request $request)
    {
        return response()->json($request->user());
    }




}
