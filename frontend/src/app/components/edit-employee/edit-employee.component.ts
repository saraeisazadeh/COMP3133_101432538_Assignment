import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $eid: ID!
    $first_name: String
    $last_name: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float
    $date_of_joining: String
    $department: String
    $employee_photo: String
  ) {
    updateEmployee(
      eid: $eid
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
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent {
  employeeForm: FormGroup;
  employeeId: string = '';
  photoBase64: string = '';

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apollo: Apollo
  ) {
    const state = this.route.getCurrentNavigation()?.extras.state as any;
    const emp = state?.employee;

    this.employeeId = emp._id;

    this.employeeForm = this.fb.group({
      first_name: [emp.first_name, Validators.required],
      last_name: [emp.last_name, Validators.required],
      email: [emp.email, Validators.required],
      gender: [emp.gender || ''],
      designation: [emp.designation || ''],
      salary: [emp.salary || 0],
      date_of_joining: [emp.date_of_joining || ''],
      department: [emp.department || ''],
      employee_photo: ['']
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
    const data = {
      ...this.employeeForm.value,
      eid: this.employeeId,
      employee_photo: this.photoBase64
    };

    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: data
    }).subscribe(() => {
      alert('Employee updated!');
      this.route.navigate(['/employees']);
    });
  }
}
