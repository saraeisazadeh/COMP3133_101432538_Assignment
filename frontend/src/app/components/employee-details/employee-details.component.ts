import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Employee {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  designation: string;
  salary: number;
  date_of_joining: string;
  department: string;
  employee_photo: string;
}

@Component({
  selector: 'app-employee-details',
  standalone: true,
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  imports: [CommonModule]
})
export class EmployeeDetailsComponent {
  employee!: Employee | null;
  router = inject(Router);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    this.employee = nav?.extras?.state?.['employee'] || null;

    if (!this.employee) {
      // Optional: redirect back if no employee was passed
      alert('No employee data found. Redirecting...');
      this.router.navigate(['/employees']);
    }
  }
}
