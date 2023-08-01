<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoritesController extends Controller
{
    public function addToFavorites(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);

       
        if (Favorite::where('user_id', $request->user_id)->where('product_id', $request->product_id)->exists()) {
            return response()->json(['message' => 'Product already in favorites.']);
        }

        Favorite::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Product added to favorites.']);
    }
}
