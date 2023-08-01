<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Insert a sample user with email and password
        User::create([
            'name' => 'example',
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Add more sample users if needed
        // User::create([
        //     'email' => 'anotheruser@example.com',
        //     'password' => Hash::make('password456'),
        // ]);

        // Add as many users as required
    }
}