import { Component, Input, OnInit } from '@angular/core';
import { IntervalTimer } from '../timer-list/timer-list.interface';

@Component({
  selector: 'app-timer-intervals',
  templateUrl: './timer-intervals.component.html',
  styleUrls: ['./timer-intervals.component.scss']
})
export class TimerIntervalsComponent implements OnInit {
  @Input() timer: IntervalTimer; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
