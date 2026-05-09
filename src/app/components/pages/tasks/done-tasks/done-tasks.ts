import { Component, Input } from '@angular/core';
import { Task } from '../../../../types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.html',
  styleUrl: './done-tasks.css',
})
export class DoneTasks {
  @Input() tasks: Task[] = [];
}
