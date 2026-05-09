import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  authService = inject(Auth)
  flag = false;

  onSubmit(form: any) {
    console.log('clicked');
    if (form.invalid) return;


    const {email , password} = form.value;

    this.authService.getUsers().subscribe((users)=>{
      let user = users.find(
        (u)=> u.email === email && u.password === password
      );
      if(user){ //l2a user
        localStorage.setItem('email',user.email);
        this.router.navigate(['/main']);
      }
      else{ //mafesh user
        this.flag = true; // hro7 fe el html a bind 3leh
      }
    })

    // if (form.valid) {
    //   this.router.navigate(['/main']);
    // }

    console.log('Form submitted', form.value);
  }
  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
