import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { fullName, email, password } = this.signupForm.value;

      this.apollo.mutate({
        mutation: SIGNUP,
        variables: {
          username: fullName,
          email,
          password
        }
      }).subscribe({
        next: ({ data }: any) => {
          alert('Signup successful! Please log in.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          alert('Signup failed. Please try again.');
        }
      });
    }
  }
}
