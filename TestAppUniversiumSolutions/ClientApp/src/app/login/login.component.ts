import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected isPasswordVisible = false;
  protected emailPlaceholder = 'Email Address';
  protected passwordPlaceholder = 'Password';
  protected errorPlaceholder = "This field can't be empty.";
  protected errorBorderColor = 'Red';
  protected commonBorderColor = '#F1F1F1';

  public submit(arr: Array<HTMLInputElement>) {
    for (var i = 0; i < arr.length; i++)
      this.validateInputElement(arr[i]);
  }

  private validateInputElement(input: HTMLInputElement) {
    if (input.value == '') {
      input.placeholder = this.errorPlaceholder;
      if (input.parentElement)
        input.parentElement.style.borderColor = this.errorBorderColor;
    }
    else {
      switch (input.type) {
        case 'email':
          input.placeholder = this.emailPlaceholder;
          break;
        case 'password':
          input.placeholder = this.passwordPlaceholder;
          break;
      }
      if (input.parentElement)
        input.parentElement.style.borderColor = this.commonBorderColor;
    }
  }

  public toggleVisibility(passwordInput: HTMLInputElement) {
    this.isPasswordVisible = !this.isPasswordVisible;
    passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
    console.log(passwordInput.value);
  }
}
