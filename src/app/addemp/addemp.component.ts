import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css'],
})
export class AddempComponent implements OnInit {
  myreact: any = FormGroup;
  success:boolean=false;
  newelement: any;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.routes.queryParams.subscribe(res=>{
      if(res){
      let data=JSON.parse(res['value'])
      this.newelement=data;
      console.log(data)
    }
  })
  }

  ngOnInit(): void {

    if(this.newelement){
      this.myreact = new FormGroup({
        firstname: new FormControl(this.newelement.firstname, Validators.required),
        lastname: new FormControl(this.newelement.lastname, Validators.required),
        phonenumber: new FormControl(this.newelement.phonenumber, [Validators.required]),
        email: new FormControl(this.newelement.emailId, [Validators.required, Validators.email]),
        Address: new FormControl(this.newelement.address, Validators.required),
      });
    }

    else{

      this.myreact = new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        phonenumber: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        Address: new FormControl(null, Validators.required),
      });
    }

  }
  onSubmit() {
    if(!this.newelement){
    console.log(this.myreact.value);
    this.success=true;
    const reqbody = {
      firstname: this.myreact.get('firstname').value,
      lastname: this.myreact.get('lastname').value,
      phonenumber: this.myreact.get('phonenumber').value,
      emailId: this.myreact.get('email').value,
      address: this.myreact.get('Address').value,
    };
    console.log(reqbody);

    this.employeeService.addEmployees(reqbody).subscribe((res) => {
      console.log(res);
    });
    this.newelement="";
  setTimeout(() => {
    this.success=false;
    this.router.navigate(['/listemp'], { relativeTo: this.routes }); 
  }, 3000);

   
  }
  else{
    this.success=true;
    const reqbody = {
      usersignupid:this.newelement.usersignupid,
      firstname: this.myreact.get('firstname').value,
      lastname: this.myreact.get('lastname').value,
      phonenumber: this.myreact.get('phonenumber').value,
      emailId: this.myreact.get('email').value,
      address: this.myreact.get('Address').value,
    };
    console.log(reqbody)
    this.employeeService.updateEmployees(reqbody).subscribe((res) => {
      console.log(res);
    });

    setTimeout(() => {
      this.success=false;
      this.router.navigate(['/listemp'], { relativeTo: this.routes }); 
    }, 2000);
  }
}
}
