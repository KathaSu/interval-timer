import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseApiService } from '@shared/services/base-api/base-api.service';
import { PASSWORD_VALIDATOR } from '@shared/utils/form-validation.utils';

@Component({
  selector: 'app-pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.scss']
})
export class PwResetComponent extends BaseApiService implements OnInit, OnDestroy {
  readonly stub = BaseApiService.URLS.PwReset;
  
  submitted: boolean;
  showPw: boolean;

  form: FormGroup = new FormGroup({
    password: new FormControl('', PASSWORD_VALIDATOR),
    password_confirm: new FormControl('', [Validators.required]),
  });

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

    // TODO: Adjust request 
    this.put(rawForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.form.reset(),
        () => null,
      )
  }
}
