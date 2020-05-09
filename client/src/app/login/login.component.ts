import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {MaterialService} from "../shared/classes/material.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        MaterialService.toast('Now you can login using your data.');
      } else if(params['accessDenied']) {
        MaterialService.toast('In order to use the app please login.');
      } else if(params['tokenExpired']) {
        MaterialService.toast('Session expired. Please enter your credentials again.');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.authService.login(this.form.value).subscribe(
      () => {
        // console.log('In login.component.ts: Login success');
        this.router.navigate(['/overview']);
      },
      error => {
        MaterialService.toast(error.error.message);
        // console.log('In login.component.ts: Login failed');
        // console.warn(error);
        this.form.enable();
      }
    );
  }
}
