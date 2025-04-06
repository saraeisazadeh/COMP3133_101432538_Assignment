import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $designation: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
    $employee_photo: String!
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      _id
    }
  }
`;

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  photoBase64: string = '';

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.photoBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = { ...this.employeeForm.value, employee_photo: this.photoBase64 };

      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: formData
      }).subscribe(() => {
        alert('Employee added!');
        this.router.navigate(['/employees']);
      });
    }
  }
}
