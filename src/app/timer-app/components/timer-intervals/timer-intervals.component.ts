import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IntervalTimer } from '../timer-list/timer-list.interface';

@Component({
  selector: 'app-timer-intervals',
  templateUrl: './timer-intervals.component.html',
  styleUrls: ['./timer-intervals.component.scss']
})
export class TimerIntervalsComponent implements OnInit {
  @Input() timer: IntervalTimer; 
  @Output() readonly backToList = new EventEmitter();
  
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
