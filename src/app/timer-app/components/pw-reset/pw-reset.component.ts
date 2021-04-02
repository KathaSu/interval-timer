import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.scss']
})
export class PwResetComponent implements OnInit, OnDestroy {
  submitted: boolean;
  showPw: boolean;

  form: FormGroup = new FormGroup({
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

  constructor() { }

  ngOnInit(): void {
    // Observe form changes and then sets submitted to false
    this.form.valueChanges.subscribe(() => {
      this.submitted = false;
      this.form.setErrors({'incorrect': null});
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Save new password
   * @returns If password don't match validator or both passwords don't match
   */
  changePw(): void {
    this.submitted = true;

    // Return if form is invalid
    if (this.form.invalid) {
      return;
    }

    // Set error if passwords don't match
    const rawForm = this.form.getRawValue();
    if (rawForm.password !== rawForm.password_confirm) {
      this.form.setErrors({'incorrect': true});
      return;
    }

    // TODO: Request 
    // this.http.put(rawForm)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     () => this.form.reset(),
    //     () => null,
    //   )
  }
}
