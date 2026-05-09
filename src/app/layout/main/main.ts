import { Component } from '@angular/core';
import { Navbar } from "../../components/main/navbar/navbar";
import { Footer } from "../../components/main/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
