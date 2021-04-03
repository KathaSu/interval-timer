import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import { SignUpData } from './sign-up.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends BaseApiService implements OnInit, OnDestroy {
  readonly stub = 'sign-up/';
  
  submitted: boolean;
  showPw: boolean;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [  	
      Validators.required,
      Validators.pattern(SignUpComponent.EMAIL_VALIDATOR),
    ]),
    password: new FormControl('', [
      Validators.required,
      // Minimum eight characters, at least one letter, one number and one special character
      Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"),
    ]),
    password_confirm: new FormControl('', [
      Validators.required,
    ]),
  });

  private static readonly EMAIL_VALIDATOR = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'; 
  private destroy$ = new Subject();

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  ngOnInit(): void {
    // Observe form changes and then sets submitted to false
    this.form.valueChanges.subscribe(() => {
      this.submitted = false;
      this.setPwErrors(null);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Sign up new user 
   * @returns If form is invalid or password don't match validator or both passwords don't match
   */
  signUp(): void {
    this.submitted = true;

    // Return if form is invalid
    if (this.form.invalid) {
      return;
    }

    // Set error if passwords don't match
    const rawForm: SignUpData = this.form.getRawValue();
    if (rawForm.password !== rawForm.password_confirm) {
      this.setPwErrors(true);
      return;
    }

    // TODO: Adjust request 
    this.put(rawForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.form.reset(),
        () => null,
      )
  }

  /**
   * Set form passwords errors
   * @param value: true to set errors and null to reset errors 
   */
  private setPwErrors(value: true | null): void {
    this.form.get('password').setErrors({'incorrect': value});
    this.form.get('password_confirm').setErrors({'incorrect': value});
  }

}
