import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

const GET_EMPLOYEES = gql`
  query {
    getAllEmployees {
      _id
      first_name
      last_name
      email
      department
      designation
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($eid: ID!) {
    deleteEmployee(eid: $eid)
  }
`;

const SEARCH_EMPLOYEES = gql`
  query Search($department: String, $designation: String) {
    searchEmployee(department: $department, designation: $designation) {
      _id
      first_name
      last_name
      email
      department
      designation
    }
  }
`;

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  imports: [CommonModule, NgIf, NgFor, FormsModule],
})
export class EmployeesComponent {
  employees: any[] = [];
  loading = true;

  searchDept = '';
  searchDesig = '';

  constructor(private apollo: Apollo, private router: Router) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe(({ data, loading }) => {
      this.employees = data.getAllEmployees;
      this.loading = loading;
    });
  }

  deleteEmployee(eid: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apollo.mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { eid },
        refetchQueries: [{ query: GET_EMPLOYEES }]
      }).subscribe(() => {
        alert('Employee deleted!');
      });
    }
  }

  searchEmployees() {
    this.apollo.watchQuery<any>({
      query: SEARCH_EMPLOYEES,
      variables: {
        department: this.searchDept || null,
        designation: this.searchDesig || null
      }
    }).valueChanges.subscribe(({ data }) => {
      this.employees = data.searchEmployee;
    });
  }

  editEmployee(emp: any) {
    this.router.navigate(['/edit-employee'], { state: { employee: emp } });
  }

  viewEmployee(emp: any) {
    this.router.navigate(['/employee-details'], { state: { employee: emp } });
  }
}
