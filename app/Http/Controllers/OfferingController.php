<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Offering;

class OfferingController extends Controller
{
     /**
     * Display a listing of the offeirngs.
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
            	return response()->json(['status' 	=> 422, 
					'message' 		=> "Request parameter missing.", 
					'payload' 		=> ['error' => $validator->errors()->first()],
					'pager'			=> NULL ], 422);
           
         
            $sortBy = ($request->has('sortBy')) ? $request->get('sortBy') : 'id';
            $sortOrder = ($request->has('sortOrder')) ? $request->get('sortOrder') : 'DESC';

            // Check if all records are requested 
            if ($request->has('records') && $request->get('records') == 'all') 
            {
                $offerings = Offering::get();
            
            } else { // Else return paginated records
                // Define pager parameters
                $pageNumber = ($request->has('pageNumber')) ? $request->get('pageNumber') : 1;
                $recordsPerPage = ($request->has('recordsPerPage')) ? $request->get('recordsPerPage') : 10;

                $skip = ($pageNumber-1) * $recordsPerPage;
                $take = $recordsPerPage;
                // Get offering details
                $offerings = Offering::orderBy($sortBy, $sortOrder)
                    ->skip($skip)
                    ->take($take)
                    ->get();

                // Get total records from the database
                $totalRecords = Offering::count();
                	
                // Records filtered
                $filteredRecords = count($offerings);
                
                $pager = ['sortBy'      => $sortBy,
                    'sortOrder'         => $sortOrder,
                    'pageNumber'        => $pageNumber,
                    'recordsPerPage'    => $recordsPerPage,
                    'totalRecords'      => $totalRecords,
                    'filteredRecords'   => $filteredRecords];
            }

            return response()->json(['status' 	=> 200, 
				'message' 		=> "Offering list.", 
				'payload' 		=> ['data' => $offerings],
				'pager'			=> NULL ], 200);

        } catch(\Exception $e) {

            \Log::error("Get offerings API failed : ". $e->getMessage());
            return response()->json(['status' 	=> 500, 
				'message' 		=> "Error while listing offerings.", 
				'payload' 		=> ['error' => 'Server error.'],
				'pager'			=> NULL ], 500);
        }
    }
}
