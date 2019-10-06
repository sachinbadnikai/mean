import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from '../../../service/login.service';
import decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  constructor(private _loginService: LoginService,
    private router: Router, private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['',Validators.compose([Validators.required])],
    });
  }

  get f() { return this.loginForm.controls; }

  clearFormData() {
    this.loginForm.reset();
  }

  onCancel() {
    this.clearFormData();
  }

  onSubmit() {
    this.submitted = true;
      this._loginService.userLogin(this.loginForm.value)
        .subscribe(res => {
          if (res.token) {
            const tokenPayload = decode(res.token);
            localStorage.setItem('token',res.token);
            localStorage.setItem('userId', tokenPayload._id);
            localStorage.setItem('role', tokenPayload.role);
            if(tokenPayload.role == "user"){
              this.router.navigateByUrl('/login/user-data')
            }
          }
        }, error => {
         this.handleError(error);
        });
  }

  private handleError(error) {
    this.toastr.error(error.error, 'Oops!', {
      timeOut: 2000
    });

  }

}
