import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceLogin } from "../service/serviceLogin";
import { Router } from "@angular/router";


@Component({
  selector: 'mw-registration',
  templateUrl: 'app/register/register.component.html',
  styleUrls: ['app/register/register.component.css']
})
export class RegisterComponent{
    form;
    constructor(private formBuilder:FormBuilder,private serviceLogin:ServiceLogin, private router: Router) {}

    ngOnInit() {
      this.form = this.formBuilder.group({
          username : this.formBuilder.control('', Validators.required), 
          password : this.formBuilder.control('', Validators.required),
          confirm : this.formBuilder.control('', Validators.required)
      }, {validator: this.checkPassword('password', 'confirm')});
    }

    onSubmit(form) {
      var register =  this.serviceLogin.register(form);
      this.serviceLogin.register(form)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
    }

    checkPassword(key1, key2) {
      return (group: FormGroup): {[key: string]: any} => {
          let password = group.controls[key1];
          let confirm =group.controls[key2];
          if (password && confirm && password.value !== confirm.value && password.value.trim() !== "" && confirm.value.trim() !== "") {
            return {
              'passwordMissMatch': true
            };
          }else {
            return null;
          }
      }
    }
}