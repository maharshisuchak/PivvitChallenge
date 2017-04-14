import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserAuthService} from "./user-auth.service";
import {Validation, CommonRegexp} from "../utility/constants/validations";
import {Route} from "../utility/constants/routes";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SharedService} from "../utility/shared-service/shared.service";

@Component({
  selector: 'user-auth',
  templateUrl: './user-auth.component.html',
  providers: [UserAuthService]
})
export class UserAuthComponent implements OnInit {

  commonRegexp = new CommonRegexp();
  validation = new Validation()

  loginForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private router: Router, private authService: UserAuthService,
              private sharedService: SharedService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.generateForm();
  }

  // On Login Button Click

  onLogin(formParams, isValidForm) {
    this.isSubmitted = true;
    if (isValidForm) {
      this.callLoginAPI(formParams);
    }
  }

  // Network Call

  callLoginAPI(params) {
    this.authService.login(params)
      .subscribe(
        response => {
          this.sharedService.setUser(response.payload.user);
          this.sharedService.setToken(response.payload.token);
          this.router.navigate(["/" + Route.PURCHASE]);
          this.isSubmitted = false;
        }, error => {
          this.isSubmitted = false;
        }
      )
  }

  // Initialize form elements with validations

  generateForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('saknits@gmail.com', Validators.compose([Validators.pattern(this.commonRegexp.EMAIL), Validators.required, Validators.minLength(5), Validators.maxLength(30)])),
      password: new FormControl('password', [<any>Validators.required, <any>Validators.pattern(this.commonRegexp.PASSWORD), <any>Validators.minLength(8)])
    })
  }

  // Form Validations

  isControlRequired(control) {
    return ((control.hasError('required') && control.touched) || (control.pristine && this.isSubmitted));
  }

  // Email Validations

  emailRequired(): boolean {
    return this.isControlRequired(this.EmailControl);
  }

  isValidEmailLength(): boolean {
    return this.EmailControl.hasError('minlength') || this.EmailControl.hasError('maxlength');
  }

  isValidEmailPattern(): boolean {
    return this.EmailControl.hasError('pattern');
  }

  // Password Validations

  passwordRequired(): boolean {
    return this.isControlRequired(this.PasswordControl);
  }

  isValidPasswordLength(): boolean {
    return this.PasswordControl.hasError('minlength');
  }

  // Get Form Controls

  get EmailControl() {
    return this.loginForm.get('email');
  }

  get PasswordControl() {
    return this.loginForm.get('password');
  }
}
