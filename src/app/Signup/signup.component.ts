import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormControl, Validators,FormBuilder,FormGroup,NgForm } from "@angular/forms";
import { MustMatch } from '../_helpers/must-match.validator';
import { AuthService } from '../auth.service';
import { JsonpClientBackend } from "@angular/common/http";

@Component({

  templateUrl: "./signup.component.html",
  styleUrls:["./signup.component.css"]
})

export class SignUpComponent implements OnInit{

  showField:boolean;
  hidep=true;
  hidec=true;
  formnotvalid:boolean=true;
  otpisvalid:boolean=false;

  firstname="";
  lastname="";
  username="";
  email="";
  phone="";
  role="";
  organisationname="";
  userpassword="";
  registerForm: FormGroup;
  submitted = false;
  otpp="";


  onKey(event: any) {
    this.organisationname = event.target.value;
  }

  selectInput(event) {
    let selected = event.target.value;
    this.role=selected;
    if (selected == "user") {
      this.showField = false;

    } else {
      this.showField = true;
    }
  }

  emailFormControl=new FormControl('',[
  Validators.required,
  Validators.email,
]);



    constructor(private formBuilder: FormBuilder,private router: Router,public authService: AuthService) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    }

    ngOnInit() {

    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

onSubmit(){
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }


  this.firstname=this.registerForm.value.firstName;
  this.lastname=this.registerForm.value.lastName;
  this.email=this.registerForm.value.email;
  this.phone=this.registerForm.value.phone;
  this.userpassword=this.registerForm.value.password;
  this.username=this.registerForm.value.username;
 // alert('SUCCESS!! :-)\n\n' + this.firstname+this.lastname+this.email+this.userpassword+this.username+this.phone+this.organisationname+this.role)
 let resource = JSON.stringify(this.registerForm.value);
 alert(resource);
 this.authService.register(resource).subscribe((res) => {
  alert(res);
  console.log(res);
})
  this.otpp="12344";

  this.formnotvalid=false;

  return;


}

onEnterotp(form:NgForm){
let enteredotp=form.value.otp;
if(enteredotp==this.otpp){
  alert('otp is valid');
  this.otpisvalid=true;
  this.router.navigate(['/pandetails']);
}
else{
  alert('otp is invalid');
  return;
}

}





}
