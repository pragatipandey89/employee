import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-listemp',
  templateUrl: './listemp.component.html',
  styleUrls: ['./listemp.component.css'],
})
export class ListempComponent implements OnInit {
  title = 'EmployeeManagement';

  public employees: any = [];
  public lis = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe((res) => {
      console.log(res);
      this.employees = res;
      console.log(this.employees);
    });
  }

  deleteemp(value: any) {
    let reqbody = {
      usersignupid: value,
    };
    this.employeeService.deleteEmployees(reqbody).subscribe(
      (res: any) => {
        console.log(res);
        if (res === 'DELETED SUCCESSFULLY') {
          this.getEmployees();
          this.router.navigate(['/addemp'], { relativeTo: this.routes });
        }
      },
      (error) => {
        console.log(error);
        this.getEmployees();
      }
    );
  }
  editpage(value:any){
    this.router.navigate(['/addemp'], { relativeTo: this.routes,queryParams:{value:JSON.stringify(value)} }); 
  }
}
