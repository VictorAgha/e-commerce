<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Sample product data
        $products = [
            [
                'name' => 'Product 1',
                'description' => 'This is the first product.',
                'category_id' => 1,
                'image' => 'product1.jpg',
                'price'=>'1000.00',                
            ],
            [
                'name' => 'Product 2',
                'description' => 'This is the second product.',
                'category_id' => 1,
                'image' => 'product2.jpg',
                'price'=>'1000.00',
            ],
            
            [
                'name' => 'Product 3',
                'description' => 'This is the second product.',
                'category_id' => 1,
                'image' => 'product3.jpg',
                'price'=>'1000.00',
            ],
        ];

        // Insert data into the products table
        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
