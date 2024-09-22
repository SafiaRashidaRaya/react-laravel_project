<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//52:39 changes these parts

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/dashboard', fn()=> Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('project', ProjectController::class);
    Route::get('task/my-tasks', [TaskController::class, 'myTasks'])->name('task.myTasks');
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class);

    // Modified part: Ban and Unban routes
    Route::post('/users/{user}/ban', [UserController::class, 'ban'])->name('users.ban'); // Ban user
    Route::post('/users/{user}/unban', [UserController::class, 'unban'])->name('users.unban'); // Unban user

    // Ensure only user with ID = 1 can access 'user' routes
    // Route::group(['middleware' => 'auth'], function () {
    //     Route::group([], function () {
    //         if (Auth::check() && Auth::user()->id === 1) {
    //             // Restricted 'user' route
    //             Route::resource('user', UserController::class);

    //             // Ban and Unban routes, also restricted
    //             Route::post('/users/{user}/ban', [UserController::class, 'ban'])->name('users.ban');
    //             Route::post('/users/{user}/unban', [UserController::class, 'unban'])->name('users.unban');
    //         } else {
    //             // Check for unauthorized access after user deletion
    //             Route::get('/user', function () {
    //                 return redirect('/dashboard')->with('error', 'Unauthorized access');
    //             });
    //         }
    //     });
    // });
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
