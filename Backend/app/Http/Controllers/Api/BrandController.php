<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveBrandRequest;
use App\Http\Requests\updateBrandRequest;
use App\Models\Brand;
use Exception;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Brands successfully get',
                'data'    => Brand :: all(),
            ], 200);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }


    public function saveBrand(SaveBrandRequest $request)
    {

        try {
            $brand = new Brand();
            $brand->brand_name = $request->brand_name;
            $brand->brand_image = $request->brand_image;
            $brand->rating = $request->rating;
            $brand->country = $request->country;
            $brand->save();

            return response()->json([
                'success' => true,
                'message' => 'Brand created successfully',
                'data'    => $brand,
            ], 201);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }


    public function updateBrand(updateBrandRequest $request, $id)
    {

        try {
            $brand = Brand::find($id);

            if ($brand) {
                $brand->brand_name = $request->brand_name;
                $brand->brand_image = $request->brand_image;
                $brand->rating = $request->rating;
                $brand->country = $request->country;

                $brand->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Brand updated successfully',
                    'data'    => $brand,
                ], 200);
            } else {
                return response()->json([
                    'success' => true,
                    'message' => 'this id does not correspond to a Brand',
                    'data'    => $brand,
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function deleteBrand($id)
    {

        try {
            $brand = Brand::find($id);
            if ($brand) {
                $brand->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Brand deleted successfully',
                    'data'    => $brand,
                ], 200);
            } else {
                return response()->json([
                    'success' => true,
                    'message' => 'this id does not correspond to a Brand',
                    'data'    => $brand,
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
