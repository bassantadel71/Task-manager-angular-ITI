import { Component, Input } from '@angular/core';
import { Task } from '../../../../types';

@Component({
  selector: 'app-deleted-tasks',
  imports: [],
  templateUrl: './deleted-tasks.html',
  styleUrl: './deleted-tasks.css',
})
export class DeletedTasks {
  @Input() tasks: Task[] = [];
}
