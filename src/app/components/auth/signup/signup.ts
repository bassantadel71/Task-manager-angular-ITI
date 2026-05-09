import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { v4 as uuidv4 } from 'uuid';

function matchPasswords(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmpassword = control.get('confirmPassword')?.value;
  return password === confirmpassword ? null : { mismatch: true };
}



@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  router = inject(Router);
  authService = inject(Auth);

  errorMessage = '';
  isLoading = false;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  },{
    validators : matchPasswords,
  }
);

  onSubmit() {
    console.log('clicked');
    if (this.signupForm.invalid) return;

    const { name, email, password } = this.signupForm.value;

    this.authService.getUsers().subscribe((users) => {
      let existUser = users.find((u) => u.email === email);
      if (existUser) {
        //l2a user b el email da
        this.errorMessage = 'Email already registered!';
        return;
      }
      else{
        const newUser = {
        id: uuidv4(),
        name: name!,
        email: email!,
        password: password!,
      };
      this.authService.registerUser(newUser).subscribe({
        //this.router.navigate(['/auth/login']) // error
        next: ()=>{
          this.router.navigate(['/auth/login'])
        },
        error: (err)=>{
          console.log(err);
          this.errorMessage = 'Something went wrong!';
        }
      })

      }

    });

    console.log('Form submitted', this.signupForm.value);
  }
}
