import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../../service/signup.service';
import { SignUp } from '../../../modules/login/signup/signup';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted = false;
  signUpForm: FormGroup;
  userObj:any
  designation:any
  constructor(private _signupService: SignupService,private router: Router,
     private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.getDesignation();
    this.initForm();
    this.userObj = new SignUp();

  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      first_Name: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      mobile: ['',Validators.compose([Validators.required,Validators.pattern('[0-9]{10}')])],
      password: ['',Validators.compose([Validators.required])],
      confirm: ['',Validators.compose([Validators.required])],
      designation: ['',Validators.compose([Validators.required])]
    });
  }

  get f() { return this.signUpForm.controls; }

  showSuccess(status) {
    this.toastr.success(status, 'Registered', {
      timeOut: 2000
    });
  }

  clearFormData() {
    this.signUpForm.reset();
  }

  onCancel() {
    this.clearFormData();
  }

  getDesignation(){
    this._signupService.getDesignation()
    .subscribe(res => {
      this.designation=res;
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
      this._signupService.userPost(this.signUpForm.value)
        .subscribe(res => {
          this.clearFormData();
         this.router.navigate(['/login/user-login']);  
         this.showSuccess('Successfully');
          
        }, error => {
         this.handleError(error);
        });
    

  }

  private handleError(error) {
    const errors=error.error.errors[0].details
    this.toastr.error(errors, 'Oops!', {
      timeOut: 2000
    });

  }

}
