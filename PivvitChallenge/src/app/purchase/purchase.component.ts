import {Component, OnInit} from "@angular/core";
import {PurchaseService} from "./purchase.service";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {API} from "../utility/constants/api";
import {Purchase} from "./purchase.model";
import {Offering} from "./offering.model";
import {SharedUser} from "../utility/shared-model/shared-user.model";
import {SharedService} from "../utility/shared-service/shared.service";
import {Route} from "../utility/constants/routes";

@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [PurchaseService]
})
export class PurchaseComponent implements OnInit {
  offeringList: Offering[] = [];
  purchaseList: Purchase[] = [];

  // Form variables
  purchaseAddForm: FormGroup;
  user: SharedUser = null;

  //Other variables
  offeringPrice: number = 0

  constructor(private sharedService: SharedService, private router: Router,
              private purchaseService: PurchaseService, private builder: FormBuilder) {
  }

  // Initiaiztion

  ngOnInit() {
    this.getPurchaseList();
    this.getOfferingList();
    this.user = this.sharedService.getUser();
    this.createForm()
  }

  calcPrice(value) {
    let total = this.offeringPrice * value;
    this.purchaseAddForm.patchValue({
      total: total
    })
    this.purchaseAddForm.get('total').disable();
  }

  offeringSelected(value) {
    let item = this.offeringList.filter((item: Offering)=> {
      return item.id == value
    });

    if (item.length > 0) {
      this.offeringPrice = item[0].price;
    }
  }

  // Form Management

  createForm() {
    this.purchaseAddForm = this.builder.group({
      customerName: new FormControl({value: this.user.name, disabled: true}, <any>Validators.required),
      offeringID: new FormControl('', <any>Validators.required),
      quantity: new FormControl('', [<any>Validators.required]),
      total: new FormControl('', [<any>Validators.required])
    })
  }

  // API calling events
  getPurchaseList() {
    this.purchaseService.getListAPICall(API.PURCHASE)
      .subscribe(response => {
        this.purchaseList = response.payload.data;
      });
  }


  getOfferingList() {
    this.purchaseService.getListAPICall(API.OFFERING)
      .subscribe(response => {
        this.offeringList = response.payload.data;
      });
  }

  savePurchase() {
    // Save new room
    let value = this.purchaseAddForm.getRawValue()
    let isFormValid = this.purchaseAddForm.valid

    if (isFormValid) {
      this.purchaseService.addAPICall(API.PURCHASE, value).subscribe(result => {
        this.getPurchaseList();
        this.createForm();
      })
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/" + Route.LOGIN]);
  }
}
