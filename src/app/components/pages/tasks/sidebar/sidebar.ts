import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() activeView:   string = 'all';

  @Output() viewChanged = new EventEmitter<string>();
}
