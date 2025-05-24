<?php

namespace App\Http\Controllers;

use App\Mail\EnrollmentConfirmationMail;
use App\Models\Child;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'child_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'lrn_or_student_id' => 'string|max:255',

            'parent_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users',
            'relationship' => 'required|string|max:255',

        ]);

        $user = User::create([
            'name' => $request->parent_name,
            'email' => $request->email,
            'password' => null,
            'contact_number' => $request->contact_number,
            'remember_token' => Str::random(40),
        ]);

        $child = Child::create([
            'name' => $request->child_name,
            'date_of_birth' => $request->date_of_birth,
            'lrn_or_student_id' => $request->lrn_or_student_id,
            'relationship' => $request->relationship,
            'user_id' => $user->id,
        ]);

        // Send confirmation email
        Mail::to($user->email)->send(new EnrollmentConfirmationMail($user, $child));

        return response()->json([
            'message' => 'Successfully registered for enrollment. Please check your email for confirmation.',
            'user' => $user,
            'child' => $child,
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


    public function completeRegistration(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|confirmed|min:8',
        ]);

        $user = User::where('remember_token', $request->token)->first();

        if (!$user || $user->created_at->lt(now()->subDays(7))) {
            return response()->json(['error' => 'Invalid or expired link'], 400);
        }

        $user->password = Hash::make($request->password);
        $user->email_verified_at = now();
        $user->remember_token = null;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Account setup complete.',
            'token' => $token,
            'user' => $user,
        ]);
    }


}
