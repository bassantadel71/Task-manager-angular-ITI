import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../services/task-service';
import { Task } from '../../../../types';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask {
  route       = inject(ActivatedRoute);
  router      = inject(Router);
  taskService = inject(TaskService);

  task!:         Task;

  isFetching   = true;
  errorMessage   = '';
  successMessage = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task      = { ...task };  
        this.isFetching = false;
      },
      error: () => {
        this.router.navigate(['/main/tasks']);
      }
    });
  }

  onSubmit(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }


    this.taskService.updateTask(this.task.id!, this.task).subscribe({
      next: () => {
        this.successMessage = 'Task updated successfully!';
        setTimeout(() => this.router.navigate(['/main/tasks']), 1000);
      },
      error: () => {
        this.errorMessage = 'Failed to update task. Try again!';
      }
    });
  }

  goBack() {
    this.router.navigate(['/main/tasks']);
  }
}
