import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-show',
  imports: [CommonModule],
  templateUrl: './slide-show.html',
  styleUrl: './slide-show.css',
})
export class SlideShow implements OnInit, OnDestroy {

  current = 0;
  timer: any;
  paused = false;

  images = [
    {
      src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1400&q=80',
      title: 'Stay Organized',
      subtitle: 'Manage all your tasks in one place.'
    },
    {
      src: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&q=80',
      title: 'Track Progress',
      subtitle: 'Know exactly where every task stands.'
    },
    {
      src: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1400&q=80',
      title: 'Get Things Done',
      subtitle: 'Complete tasks and move forward with confidence.'
    },
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  startAutoPlay() {
    this.timer = setInterval(() => {
      if (!this.paused) {
        this.next();
      }
    }, 4000);
  }

  next() {
    this.current = (this.current + 1) % this.images.length;
  }

  prev() {
    this.current =
      (this.current - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.current = index;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }
}
