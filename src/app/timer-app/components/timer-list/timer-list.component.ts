import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IntervalTimer } from './timer-list.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BaseApiService } from '@shared/services/base-api/base-api.service';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss']
})
export class TimerListComponent extends BaseApiService implements OnInit, OnDestroy {
  readonly stub = BaseApiService.URLS.TimerList;

  list: Array<IntervalTimer> = [
    {
      "id": 1234, 
      "title": "Interval timer 1",
      "intervals": [
        {"id": 1234, "title": "Interval 1", "time": 1234},
        {"id": 1234, "title": "Interval 2", "time": 1234},
        {"id": 1234, "title": "Interval 3", "time": 1234},
        {"id": 1234, "title": "Interval 4", "time": 1234}
      ],
      "total": 213234
    },    {
      "id": 1234, 
      "title": "Interval timer 2",
      "intervals": [
        {"id": 1234, "title": "Interval 1", "time": 1234},
        {"id": 1234, "title": "Interval 2", "time": 1234},
        {"id": 1234, "title": "Interval 3", "time": 1234},
        {"id": 1234, "title": "Interval 4", "time": 1234}
      ],
      "total": 213234
    },    {
      "id": 1234, 
      "title": "Interval timer 3",
      "intervals": [
        {"id": 1234, "title": "Interval 1", "time": 1234},
        {"id": 1234, "title": "Interval 2", "time": 1234},
        {"id": 1234, "title": "Interval 3", "time": 1234},
        {"id": 1234, "title": "Interval 4", "time": 1234}
      ],
      "total": 213234
    },
  ];
    
  selectedTimer: IntervalTimer;

  private destroy$ = new Subject();

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
   }

  ngOnInit(): void {
    // TODO: Get total time of intervals in list
    this.getList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    // TODO: Request
  }

  /**
   * Delete interval timer
   * @param index of item in list 
   * @param id of interval timer 
   */
  deleteTimer(index: number, id: number): void {
    // TODO: Adjust Request 
    this.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.list.splice(index, 1),
        () => null,
      )
  }

  
  /**
   * Get list of all interval timer
   */
   private getList(): void {
    // TODO: Adjust request 
    this.get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => null,
        () => null,
      )
  }
}
