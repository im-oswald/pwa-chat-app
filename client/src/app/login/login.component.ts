import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginTriggered: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  isInvalid(fieldName: string): boolean {
    return this.loginTriggered && !!this.f[fieldName].errors;
  }

  getErrorMessage(fieldName: string) {
    const firstError = Object.keys(this.f[fieldName].errors || {})[0];

    if (!firstError) {
      return '';
    }

    switch (firstError) {
      case 'required':
        return `${fieldName} is required`;
      case 'email':
        return 'invalid email format'
      default:
        return `${fieldName} is not valid`;
    }
  }

  initForm() {
    this.loginTriggered = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.loginTriggered = true;
  }
}
