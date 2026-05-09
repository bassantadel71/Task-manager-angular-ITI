import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../services/task-service';
import { Task } from '../../../../types';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  route       = inject(ActivatedRoute);
  router      = inject(Router);
  taskService = inject(TaskService);

  task!:    Task;
  isLoading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task      = task;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/main/tasks']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/main/tasks']);
  }
}
