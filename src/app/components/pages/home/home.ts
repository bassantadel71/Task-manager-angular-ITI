import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SlideShow } from "../slide-show/slide-show";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule,SlideShow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('revealRef', { read: ElementRef }) revealRefs!: QueryList<ElementRef>;
  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }}
