import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../modules/login/user-data/user';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  submitted = false;
  userForm: FormGroup;
  userDetails:any;
  userObj:any;
  noUserDetails:any
  constructor(private _userService: UserService,
     private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
    this.getUserDetails()
    this.userObj = new User();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
     // name: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      url: ['',Validators.compose([Validators.required])],
      mobile_no: ['',Validators.compose([Validators.required,
      Validators.pattern('[0-9]{10}')
      ])],
      gender: ['',Validators.compose([Validators.required])],
      description: ['',Validators.compose([Validators.required])],
      date: ['',Validators.compose([Validators.required])],
      time:['',Validators.compose([Validators.required])]
    });
  }

  showSuccess(status) {
    this.toastr.success(status, 'User Details', {
      timeOut: 2000
    });
  }

  getUserDetails(){
    const user_id=localStorage.getItem("userId")
    this._userService.getuserDetails(user_id)
    .subscribe(res => {
      this.userDetails=res;
      this.noUserDetails=this.userDetails.length
    });
  }

  delete(user) {
    if (confirm(`Do you want to delete the user details`)) {
      this._userService.deleteUserDetails(user._id)
        .subscribe(res => {
          this.getUserDetails();
          this.clearFormData();
          this.showSuccess('Successfully Deleted');
        },error => {
          this.handleError(error);
         });
    }
  }

  getById($event) {
    this._userService.getById($event.target.id)
      .subscribe(res => {
        this.userObj = res;
      });
  }

  clearFormData() {
    this.submitted = false;
    this.userObj = new User();
  }

  onCancel() {
    this.clearFormData();
  }

   get f() { return this.userForm.controls; }

  updateUserDetails(id, instance) {
    this._userService.updateUserDetails(id, instance)
      .subscribe(res => {
        this.clearFormData();
        this.getUserDetails();
        this.showSuccess('Successfully Updated');
      },error => {
        this.handleError(error);
       });
  }

  onSubmit(id) {
    this.submitted = true;
    const data={
      user_id:localStorage.getItem("userId"),
      user:this.userForm.value
    }
    if (this.userForm.invalid) {
      return;
    }
    if (id !== undefined) {
      this.updateUserDetails(id, this.userForm.value);
    } else{
      this._userService.userPost(data)
      .subscribe(res => {
        this.getUserDetails();
        this.showSuccess('Successfully Added');
        this.clearFormData();
      }, error => {
        this.handleError(error);
       });
    }
  }

  private handleError(error) {
    console.log('error',error)
    this.toastr.error(error.error, 'Oops!', {
      timeOut: 2000
    });

  }

}
