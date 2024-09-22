<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\verifyEmailByOTP;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function createVerifyUser(): Response
    {
        return Inertia::render('Auth/VerifyUser');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'otp' => random_int(100000, 999999),
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        $details = ['name' => $user->name, 'email' => $user->email, 'otp' => $user->otp];
        Mail::to($details['email'])->send(new verifyEmailByOTP($details));

        // Auth::login($user);

        // return redirect(route('dashboard', absolute: false));
        return redirect(route('verifyUser', absolute: false));
    }

    public function verifyUser(Request $request) {
        $user = User::where([['email', $request->email]])->first();

        if ($user->otp == $request->otp) {
            $user->email_verified_at = now();
            
            $user->save();
            Auth::login($user);
            return redirect(route('dashboard', absolute: false));
        }else {
            return response()->json('Invalid OTP Input', 200);
        }
    }

    public function resendOTP(Request $request) {
        $user = User::where([['email', $request->email]])->first();
        $details = ['name' => $user->name, 'email' => $user->email, 'otp' => $user->otp];
        Mail::to($details['email'])->send(new verifyEmailByOTP($details));
    }
}
