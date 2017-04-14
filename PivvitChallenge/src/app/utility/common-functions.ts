import {Base64} from "./base64-typescript-class";

export class CommonFunctions {

  public static ENCRYPT_OBJ(value: any): any {
    let base64 = new Base64();
    return base64.encode(JSON.stringify(value));
  }

  public static DECRYPT_OBJ(value: any): any {
    if (value && value != null) {
      let base64 = new Base64();
      return JSON.parse(base64.decode(value));
    }
    return '';
  }

  public static ConvertIntToBoolean(value): boolean {
    if (value == null)
      return false;
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  }

  public static Logger(value1, value2?) {
    console.log("------------>", value1, value2);
  }

  public static isValidString(stringVal): boolean {
    let valid: boolean = false;
    if (stringVal && stringVal != "null" && stringVal != null && stringVal != "undefined") {
      valid = true
    }
    return valid;
  }

}
