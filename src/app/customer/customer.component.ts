import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

interface selectOption {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  selectedProductPrices: number[] = [];
  showPrice = false;

  constructor(public service: UsersService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  gender: selectOption[] = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ]

  civil_status: selectOption[] = [
    { value: 'Single', viewValue: 'Single' },
    { value: 'Married', viewValue: 'Married' },
    { value: 'Divorced', viewValue: 'Divorced' },
    { value: 'Separated', viewValue: 'Separated' },
    { value: 'Widowed', viewValue: 'Widowed' },
  ]

  products: selectOption[] = [
    { value: 'Life Plan', viewValue: 'Life Plan' },
    { value: 'Education', viewValue: 'Education' },
    { value: 'Pension', viewValue: 'Pension' },
  ]

  onProductChange(): void {
    const product = this.service.form.get('product')?.value;
    this.showPrice = true;

    switch (product) {
      case 'Life Plan':
        this.selectedProductPrices = this.generatePriceRange(30000, 60000);
        break;
      case 'Education':
        this.selectedProductPrices = this.generatePriceRange(50000, 150000);
        break;
      case 'Pension':
        this.selectedProductPrices = this.generatePriceRange(30000, 100000);
        break;
      default:
        this.showPrice = false;
        break;
    }
  }

  generatePriceRange(min: number, max: number): number[] {
    const range: number[] = [];
    for (let price = min; price <= max; price += 5000) {
      range.push(price);
    }
    return range;
  }

  onSubmit(): void {
    if (this.service.form.valid) {
      this.service.postEternalPlans().subscribe(res => {
        this.toastr.success('Successfully Created!')
      })
    }
  }

  onReset(): void {
    this.service.form.reset();    
  }

  displayColumns: string[] = ['fullname', 'address', 'birthday', 'gender', 'civil_status', 'contact_number', 'email_address', 'product', 'price'];

  openDialog(user: any) {
    this.dialog.open(DialogComponent, {
      data: { user }
    })
  }
}
