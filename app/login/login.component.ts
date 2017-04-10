import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceLogin } from "../service/serviceLogin";

@Component({
  selector: 'mw-login-form',
  templateUrl: 'app/login/login.component.html',
  styleUrls:['app/login/login.component.css']
})
export class LoginComponent {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private serviceLogin: ServiceLogin) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      password: this.formBuilder.control('', Validators.compose([
        Validators.required]))
    });
  }


  onSubmit(login) {
    this.serviceLogin.login(login.name, login.password)
            .subscribe(
                response => {
                    this.router.navigate(["list"]);
                },
                error => {
                    this.router.navigate(["list"]);
                });
  }
}
