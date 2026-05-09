import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../../types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [NgClass],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
   router = inject(Router);

  @Input()  task!: Task;
  @Output() markDone    = new EventEmitter<string>();
  @Output() markDeleted = new EventEmitter<string>();

  viewDetails() {
    this.router.navigate(['/main/tasks', this.task.id]);
  }
   editTask() {
    this.router.navigate(['/main/tasks', this.task.id, 'edit']);  
  }
}
