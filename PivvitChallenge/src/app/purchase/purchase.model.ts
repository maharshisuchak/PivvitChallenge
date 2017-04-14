export class Purchase {
  private _id: number;
  private _offeringID: number;
  private _quantity: number
  private _customerName: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get offeringID(): number {
    return this._offeringID;
  }

  set offeringID(value: number) {
    this._offeringID = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get customerName(): string {
    return this._customerName;
  }

  set customerName(value: string) {
    this._customerName = value;
  }
}
