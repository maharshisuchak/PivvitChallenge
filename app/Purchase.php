<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    protected $table = 'purchase';

    //  Get offering associated with purchase
    public function offering()
    {
        return $this->belongsTo(Offering::class, 'offeringID', 'id');
    }
}
