import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/task-service';
import { Task } from '../../../types';
import { Sidebar } from './sidebar/sidebar';
import { AllTasks } from './all-tasks/all-tasks';
import { DoneTasks } from './done-tasks/done-tasks';
import { DeletedTasks } from './deleted-tasks/deleted-tasks';


@Component({
  selector: 'app-tasks',
  imports: [Sidebar, AllTasks, DoneTasks, DeletedTasks],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  taskService = inject(TaskService);
  email       = localStorage.getItem('email') || '';

  activeTasks:  Task[] = [];
  doneTasks:    Task[] = [];
  deletedTasks: Task[] = [];

  activeView = 'all';
  isLoading  = false;

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.isLoading = true;
    this.loadActiveTasks();
    this.loadDoneTasks();
    this.loadDeletedTasks();
  }

  loadActiveTasks() {
    this.taskService.getActiveTasks(this.email).subscribe({
      next: (tasks) => {
        this.activeTasks = tasks;
        this.isLoading   = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  loadDoneTasks() {
    this.taskService.getDoneTasks(this.email).subscribe({
      next: (tasks) => {
        this.doneTasks = tasks;
      }
    });
  }

  loadDeletedTasks() {
    this.taskService.getDeletedTasks(this.email).subscribe({
      next: (tasks) => {
        this.deletedTasks  = tasks;
      }
    });
  }

  onViewChange(view: string) {
    this.activeView = view;
  }

  onMarkDone(id: string) {
    this.taskService.markDone(id).subscribe({
      next: () => this.loadAll()
    });
  }

  onMarkDeleted(id: string) {
    this.taskService.markDeleted(id).subscribe({
      next: () => this.loadAll()
    });
  }
}
