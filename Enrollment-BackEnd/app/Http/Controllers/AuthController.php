<?php

namespace App\Http\Controllers;

use App\Mail\EnrollmentConfirmationMail;
use App\Models\Child;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
        ]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'parent.parent_name' => 'required|string|max:255',
            'parent.email' => 'required|email|unique:users,email',
            'parent.contact_number' => 'required|string|max:20',
            'parent.relationship' => 'required|string|max:50',
            'children' => 'required|array|min:1',
            'children.*.child_name' => 'required|string|max:255',
            'children.*.date_of_birth' => 'required|date',
            'children.*.lrn_or_student_id' => [
                'required',
                'string',
                'max:100',
                'distinct',
                'unique:children,lrn_or_student_id',
            ],
        ], [
            'parent.parent_name.required' => 'The parent name is required.',
            'parent.email.required' => 'The email is required.',
            'parent.email.email' => 'The email must be a valid email address.',
            'parent.email.unique' => 'The email has already been taken.',
            'parent.contact_number.required' => 'The contact number is required.',
            'parent.relationship.required' => 'The relationship is required.',
            'children.required' => 'At least one child must be added.',
            'children.min' => 'At least one child is required.',
            'children.*.child_name.required' => 'Each child must have a name.',
            'children.*.date_of_birth.required' => 'Each child must have a date of birth.',
            'children.*.date_of_birth.date' => 'Each child\'s date of birth must be a valid date.',
            'children.*.lrn_or_student_id.unique' => 'The LRN or student ID has already been taken.',
            'children.*.lrn_or_student_id.distinct' => 'Duplicate LRN or student ID found in the submission.',
            'children.*.lrn_or_student_id.max' => 'The LRN or student ID may not be greater than 100 characters.',
        ]);

        return DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['parent']['parent_name'],
                'email' => $validated['parent']['email'],
                'relationship' => $validated['parent']['relationship'],
                'password' => null,
                'contact_number' => $validated['parent']['contact_number'],
                'remember_token' => Str::random(40),
            ]);

            $children = [];
            foreach ($validated['children'] as $childData) {
                $children[] = $user->children()->create([
                    'name' => $childData['child_name'],
                    'date_of_birth' => $childData['date_of_birth'],
                    'lrn_or_student_id' => $childData['lrn_or_student_id'] ?? null,
                ]);
            }

            $user->remember_token = Str::random(60);
            $user->token_expires_at = now()->addHours(24);  // token valid for 24 hours
            $user->save();

            Mail::to($user->email)->send(new EnrollmentConfirmationMail($user, $children));

            return response()->json([
                'message' => 'Successfully registered for enrollment. Please check your email for confirmation.',
            ], 201);
        });
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function confirmEmail(Request $request)
    {
        $request->validate([
            'token' => 'required|string'
        ]);

        $user = User::where('remember_token', $request->token)
                    ->where('token_expires_at', '>', Carbon::now())
                    ->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid or expired confirmation link.'
            ], 400);
        }

        return response()->json([
            'message' => 'Email confirmed successfully.',
            'user_id' => $user->id
        ]);
    }

    public function setPassword(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'password' => 'required|confirmed|min:8'
        ]);

        $user = User::findOrFail($request->user_id);
        $user->password = Hash::make($request->password);
        $user->remember_token = null;
        $user->email_verified_at = Carbon::now();
        $user->save();

        return response()->json([
            'message' => 'Password set successfully.',
            'token' => $user->createToken('auth-token')->plainTextToken
        ]);
    }

}
