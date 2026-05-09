import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task-service';
import { Task } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule],
  templateUrl: './form-add-task.html',
  styleUrl: './form-add-task.css',
})
export class FormAddTask {
  router = inject(Router);
  taskService = inject(TaskService);

  errorMessage = '';
  successMessage = '';

  newTask: Task = {
    id: '',
    email: localStorage.getItem('email') || '',
    title: '',
    description: '',
    priority: 'Low',
    date: '',
    category: 'Work',
    tags: '',
    is_done: false,
    is_deleted: false,
  };

  onSubmit(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.newTask.id = uuidv4();

    this.taskService.addTask({ ...this.newTask }).subscribe({
      next: () => {
        this.successMessage = 'Task added successfully!';
        console.log(this.successMessage);

        form.resetForm();

        this.newTask = {
          id: '',
          title: '',
          email: '',
          description: '',
          priority: 'Low',
          category: 'Work',
          date: '',
          tags: '',
          is_done: false,
          is_deleted: false,
        };
      },
      error: () => {
        this.errorMessage = 'Failed to add task. Try again!';
      },
    });
  }
}
