import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  constructor(public userService: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getEternalPlans()
  }

  getCurrentUser(selectedUser: User) {
    this.userService.form.setValue({
      _id: selectedUser._id,
      fullname: selectedUser.fullname,
      address: selectedUser.address,
      birthday: selectedUser.birthday,
      gender: selectedUser.gender,
      civil_status: selectedUser.civil_status,
      contact_number: selectedUser.contact_number,
      email_address: selectedUser.email_address,
      product: selectedUser.product,
      price: selectedUser.price,
    })
  }
}
