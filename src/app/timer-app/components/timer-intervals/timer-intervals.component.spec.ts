import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerIntervalsComponent } from './timer-intervals.component';

describe('TimerIntervalsComponent', () => {
  let component: TimerIntervalsComponent;
  let fixture: ComponentFixture<TimerIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerIntervalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
