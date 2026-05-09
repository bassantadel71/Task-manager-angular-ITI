import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../types';
import { TaskCard } from "../task-card/task-card";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  imports: [TaskCard ,RouterLink],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css',
})
export class AllTasks {
  @Input()  tasks: Task[] = [];
  @Output() markDone    = new EventEmitter<string>();
  @Output() markDeleted = new EventEmitter<string>();
}
