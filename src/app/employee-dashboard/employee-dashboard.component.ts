import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from './../../app/shared/api.service'
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel()
  employeeData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;

  totalLenght: any;
  page: number = 1;


  constructor(private api: ApiService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      salary: ['']

    })
    this.getAllEmployee();

  }



  postEmpolyeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added Successfully")
        let ref = document.getElementById("cancel")
        ref?.click()
        this.formValue.reset();
        this.getAllEmployee();
      },
        err => {
          console.log(err);
          alert("Employee Added Failed")
        })

  }

  getAllEmployee() {
    this.api.getEmploye()
      .subscribe(res => {
        this.employeeData = res;
        this.totalLenght = res.length;
      })
  }

  clickAddEmploye() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmpolyeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmploye(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {

        alert("Employee Updated!!")
        let ref = document.getElementById("cancel")
        ref?.click()
        this.formValue.reset();
        this.getAllEmployee();
      })

  }

  deleteEmployee(row: any) {
    this.api.DeleteEmploye(row.id)
      .subscribe(res => {

        alert("Employee Deleted!!")
        this.getAllEmployee();
      })
  }

}
