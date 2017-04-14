<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Purchase;

class PurchaseController extends Controller
{
    /**
     * Store a newly added purchase.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            //validate details
            $validator = app('validator')->make($request->all(), [
                'customerName'		=> 'required',
                'offeringID'		=> 'required|numeric',
                'quantity'			=> 'required|numeric|min:1'
            ]);

            if ($validator->fails())
				return response()->json(['status' 	=> 422, 
						'message' 		=> "Request parameter missing.", 
						'payload' 		=> ['error' => $validator->errors()->first()],
						'pager'			=> NULL ], 422);

            // Insert purchase data into database
			$purchase = Purchase::create([
				'customerName'		=> $request->get('customerName'),
				'offeringID'		=> $request->get('offeringID'),
				'quantity'			=> $request->get('quantity')
				]);

            // Successful response with required data
			return response()->json(['status' 	=> 200, 
						'message' 		=> "Purchase has been made successfully.", 
						'payload' 		=> ['purchase' => $purchase],
						'pager'			=> NULL ], 200);

        } catch (\Exception $e) {

            \Log::error("Purchase API failed : ". $e->getMessage());
            return response()->json(['status' 	=> 500, 
				'message' 		=> "Could not make purchase.", 
				'payload' 		=> ['error' => 'Server error.'],
				'pager'			=> NULL ], 500);
        }
    }

     /**
     * Display a listing of the purchases.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            // validate detals
            $validator = app('validator')->make($request->all(),[
                'sortOrder'     => 'in:asc,desc',
                'pageNumber'    => 'numeric|min:1',
                'recordsPerPage'=> 'numeric|min:0',
                'search'        => 'json'
            ],[]);   
            
            if ($validator->fails()) 
                return response()->json(['status'   => 422, 
                    'message'       => "Request parameter missing.", 
                    'payload'       => ['error' => $validator->errors()->first()],
                    'pager'         => NULL ], 422);
           
         
            $sortBy = ($request->has('sortBy')) ? $request->get('sortBy') : 'id';
            $sortOrder = ($request->has('sortOrder')) ? $request->get('sortOrder') : 'DESC';

            // Check if all records are requested 
            if ($request->has('records') && $request->get('records') == 'all') 
            {
                $purchases = Purchase::with('offering')->get();
            
            } else { // Else return paginated records
                // Define pager parameters
                $pageNumber = ($request->has('pageNumber')) ? $request->get('pageNumber') : 1;
                $recordsPerPage = ($request->has('recordsPerPage')) ? $request->get('recordsPerPage') : 10;

                $skip = ($pageNumber-1) * $recordsPerPage;
                $take = $recordsPerPage;
                // Get purchases
                $purchases = Purchase::orderBy($sortBy, $sortOrder)
                    ->with('offering')
                    ->skip($skip)
                    ->take($take)
                    ->get();

                // Get total records from the database
                $totalRecords = Purchase::count();
                    
                // Records filtered
                $filteredRecords = count($purchases);
                // Define pager parameters
                $pager = ['sortBy'      => $sortBy,
                    'sortOrder'         => $sortOrder,
                    'pageNumber'        => $pageNumber,
                    'recordsPerPage'    => $recordsPerPage,
                    'totalRecords'      => $totalRecords,
                    'filteredRecords'   => $filteredRecords];
            }

            return response()->json(['status'   => 200, 
                'message'       => "purchases list.", 
                'payload'       => ['data' => $purchases],
                'pager'         => NULL ], 200);

        } catch(\Exception $e) {

            \Log::error("Get purchases API failed : ". $e->getMessage());
            return response()->json(['status'   => 500, 
                'message'       => "Error while listing purchases.", 
                'payload'       => ['error' => 'Server error.'],
                'pager'         => NULL ], 500);
        }
    }
}
