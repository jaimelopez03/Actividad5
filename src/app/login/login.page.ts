import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void{
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      this.authService.login(email,password);

    } else {
      console.log('error');
    }
    
  }
}
