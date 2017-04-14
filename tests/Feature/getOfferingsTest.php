<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class getOfferingsTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
         $this->json('GET', '/api/offering', [])
             ->seeJsonStructure([
                "status" => 200,
                "message" => "Offering list.",
                "payload" => [
                	'data'	=> "*"
                	],
                "pager"	=> "*"
             ]);
    }
}
