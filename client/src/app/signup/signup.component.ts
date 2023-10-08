import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@src/services/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  signupTriggered: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  isInvalid(fieldName: string): boolean {
    return this.signupTriggered && !!this.f[fieldName].errors;
  }

  // show 1 error message at a time
  getErrorMessage(fieldName: string) {
    const firstErrorKey = Object.keys(this.f[fieldName].errors || {})[0];

    if (!firstErrorKey) {
      return '';
    }

    const firstError = this.f[fieldName].errors?.[firstErrorKey];

    console.log(this.f[fieldName].errors);

    switch (firstErrorKey) {
      case 'required':
        return `${fieldName} is required`;
      case 'email':
        return 'invalid email format';
      case 'minlength':
        return `${fieldName} should be ${firstError.requiredLength} characters long atleast`;
      case 'pattern':
        return `${fieldName} should be min 8 chars including uppercase`;
      case 'passwordMismatch':
        return `mismatch with password`;
      default:
        return `${fieldName} is not valid`;
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const parent = control.parent as FormGroup;
    const password = parent?.get('password');
  
    if (password?.value !== control?.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }

  initForm() {
    this.signupTriggered = false;
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(`^(?=.*[A-Z])(?=.*[^\w_]).{8,}$`)]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator])
    });
  }

  onSubmit() {
    this.signupTriggered = true;
    
    if (!this.signupForm.valid)
      return

    const payload = this.signupForm.value;

    this.userService.register(payload).subscribe((res) => {
      debugger
    });
  }
}
