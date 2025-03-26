import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss'],
})
export class EmployeeModalComponent {
  @Input() isEditMode: boolean = false; // Determines if it's add or edit mode
  @Input() employeeData: any = null; // Data for editing
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  today = new Date();

  employeeForm: FormGroup;
  groupOptions: string[] = [
    'Group A', 'Group B', 'Group C', 'Group D', 'Group E',
    'Group F', 'Group G', 'Group H', 'Group I', 'Group J',
  ];
  filteredGroupOptions: string[] = [...this.groupOptions];

  constructor(private fb: FormBuilder) {
    const b = new Date();
    b.setDate(new Date().getDate() - 1);
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [
        `${b.getFullYear()}-${(b.getMonth() + 1).toString().padStart(2, '0')}-${b.getDate().toString().padStart(2, '0')}`,
        [Validators.required, this.validateBirthDate],
      ],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.isEditMode && this.employeeData) {
      const d = Object.assign({}, this.employeeData);
      const b = new Date(this.employeeData.birthDate);
      d.birthDate = `${b.getFullYear()}-${(b.getMonth() + 1).toString().padStart(2, '0')}-${b.getDate().toString().padStart(2, '0')}`
      this.employeeForm.patchValue(d);
    }
  }

  validateBirthDate(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    if (selectedDate > today) {
      return { invalidDate: true };
    }
    return null;
  }

  onGroupSearch(event: any) {
    const searchText = event?.target?.value;
    this.filteredGroupOptions = this.groupOptions.filter((group) =>
      group.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}