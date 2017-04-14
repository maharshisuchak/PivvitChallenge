<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class getPurchaseTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->json('GET', '/api/purchases', [])
             ->seeJsonStructure([
                "status" => 200,
                "message" => "purchases list.",
                "payload" => [
                	'data'	=> "*"
                	],
                "pager"	=> "*"
             ]);
    }
}
