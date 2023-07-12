import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  form!: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      _id: [''],
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      civil_status: ['', Validators.required],
      contact_number: ['', Validators.required],
      email_address: ['', Validators.required],
      product: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  get eternalplansForm() {
    return this.form.controls;
  }

  postEternalPlans() {
    return this.http.post(environment.baseURL, this.form.value)
      .pipe(catchError(this.handleError))
  }

  getEternalPlans() {
    return this.http.get(environment.baseURL)
      .pipe(catchError(this.handleError))
      .subscribe(data => {
        this.users = data as User[]
      })
  }

  putEternalPlans() {
    return this.http.put(environment.baseURL+this.form.get('_id')?.value, this.form.value)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
