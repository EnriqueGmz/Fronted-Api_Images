import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/http-interceptors/auth.interceptor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: any = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  emailpattern =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

  submitted = false;
  error = false;
  error2 = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(this.emailpattern),
          ]),
        ],
      ],
      password: [
        '',
        [Validators.compose([Validators.required, Validators.minLength(6)])],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.valid) {
      const body = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };

      this.userService.login(JSON.stringify(body)).subscribe(
        (res: any) => {
          AuthInterceptor.accessToken = res.token;
          this.router.navigate(['/']);
          console.log(body);
        },
        (res: HttpResponse<any>) => {
          if (res.status === 400) {
            console.log(this.error);
            console.log(this.error);
            this.error = true;
            this.error2 = false;
            console.log(body);
          } else if (res.status === 403) {
            this.error = false;
            this.error2 = true;
          }
        }
      );
    }
  }
}
