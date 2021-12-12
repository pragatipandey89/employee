import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apibaseURL;
  wsetvalue:any={};

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/user/all');
  }

  public addEmployees(Employee: {
    firstname: any;
    lastname: any;
    phonenumber: any;
    emailId: any;
    address: any;
  }): Observable<Employee> {
    return this.http.post<any>('http://localhost:8081/user/save', Employee);
  }

  public updateEmployees(Employee: {
    firstname: any;
    lastname: any;
    phonenumber: any;
    emailId: any;
    address: any;
  }): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8081/user/update',Employee);
  }

  public deleteEmployees(emp: { usersignupid: any }): Observable<void> {
    return this.http.post<any>('http://localhost:8081/user/delete', emp);
  }

}
