<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class createPurchaseTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->json('POST', '/api/purchases', ['customerName' => 'Donald Trump', 'offeringID' => 1, 'quantity' => 1])
             ->seeJsonStructure([
                "status" => 200,
                "message" => "Purchase has been made successfully.",
                "payload" => [
                	'purchase'	=> "*"
                	],
                "pager"	=> "*"
             ]);
    }
}
