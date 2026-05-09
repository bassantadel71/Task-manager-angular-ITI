import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl, Task } from '../types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  // getTasks() : Observable<Task[]>{
  //   return this.http.get<Task[]>(`${apiUrl}/tasks`)
  // }

  getTasks(email: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${apiUrl}/tasks?email=${email}`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${apiUrl}/tasks/${id}`);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${apiUrl}/tasks`, task);
  }
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${apiUrl}/tasks/${id}`, task);
  }
  getActiveTasks(email: string): Observable<Task[]> {
    return this.getTasks(email).pipe(
      map((tasks) => tasks.filter((t) => !t.is_done && !t.is_deleted)),
    );
  }
  getDoneTasks(email: string): Observable<Task[]> {
    return this.getTasks(email).pipe(
      map((tasks) => tasks.filter((t) => t.is_done && !t.is_deleted)),
    );
  }
  getDeletedTasks(email: string): Observable<Task[]> {
    return this.getTasks(email).pipe(map((tasks) => tasks.filter((t) => t.is_deleted)));
  }


  markDone(id: string): Observable<Task> {
    return this.http.patch<Task>(`${apiUrl}/tasks/${id}`, { is_done: true });
  }

  markDeleted(id: string): Observable<Task> {
    return this.http.patch<Task>(`${apiUrl}/tasks/${id}`, { is_deleted: true });
  }
}
