import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppData } from '../../app.data';
import { Store } from '@ngxs/store';
import { EmployeesState } from '../[data]/employees.state';
import { Employees } from '../[data]/employees.interface';
import { FormsModule } from '@angular/forms';
import { RupiahPipe } from '../../../@core/pipe/rupiah.pipe';
import { EmployeeModalComponent } from '../ui/employee-modal/employee-modal.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RupiahPipe, RouterOutlet, RouterLink, FormsModule, EmployeeModalComponent],
  providers: [],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  $articles = inject(Store).select(EmployeesState.getDatas);

  constructor(
    private router: Router,
    public appData: AppData,
  ) {
  }

  async ngOnInit() {
    this.$articles?.subscribe((n) => {
      this.employees = Object.assign([], n);
      this.filteredEmployees = Object.assign([], n);
    });
  }

  employees: Employees.Entity[] = [];
  filteredEmployees: Employees.Entity[] = [];
  searchQuery: string = '';
  sortField: 'firstName' | 'basicSalary' = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 12;
  isModalOpen = false;
  isEditMode = false;

  onSearch() {
    this.filteredEmployees = this.employees.filter((employee) =>
      [employee.username, employee.firstName, employee.lastName]
        .join(' ')
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page
  }

  onSort(field: 'firstName' | 'basicSalary') {
    this.currentPage = 1;
    this.sortField = field;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredEmployees = this.filteredEmployees.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get pages() {
    return Array(Math.ceil(this.filteredEmployees.length / this.itemsPerPage));
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  goToLink(url: string) {
    this.router.navigateByUrl('/detail/' + url);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
  
  showAlert = false;
  alertMessage = '';
  showModal = false;
  employeeToDelete: string | null = null;

  confirmDelete(username: string) {
    this.employeeToDelete = username;
    this.showModal = true; // Show the confirmation modal
  }

  deleteEmployee() {
    if (this.employeeToDelete) {
      this.employees = this.employees.filter(
        (employee) => employee.username !== this.employeeToDelete
      );
      this.filteredEmployees = this.filteredEmployees.filter(
        (employee) => employee.username !== this.employeeToDelete
      );
      this.showSnackbar(`Employee with username "${this.employeeToDelete}" has been deleted.`);
      this.employeeToDelete = null;
    }
    this.showModal = false; // Hide the modal
  }

  cancelDelete() {
    this.employeeToDelete = null;
    this.showModal = false; // Hide the modal
  }

  showSnackbar(message: string) {
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Hide snackbar after 3 seconds
  }

  selectedEmployee: Employees.Entity | null = null;

  openAddModal() {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.selectedEmployee = null;
  }

  openEditModal(employee: Employees.Entity) {
    this.isModalOpen = true;
    this.isEditMode = true;
    this.selectedEmployee = employee;
  }

  onSaveEmployee(employeeData: Employees.Entity) {
    if (this.isEditMode) {
      // Update existing employee
      let index = this.employees.findIndex((e) => e.username === employeeData.username);
      if (index !== -1) {
        this.employees[index] = employeeData;
      }
      index = this.filteredEmployees.findIndex((e) => e.username === employeeData.username);
      if (index !== -1) {
        this.filteredEmployees[index] = employeeData;
      }
    } else {
      // Add new employee
      this.employees.unshift(employeeData);
      this.filteredEmployees.unshift(employeeData);
      this.currentPage = 1;
    }
    this.isModalOpen = false;
  }

  onCancelModal() {
    this.isModalOpen = false;
  }
}

