import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {CarouselComponent} from "./carousel/carousel.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CarouselComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjsTutorial';
  constructor(private router:Router) {
  }
  navigateToPage(path: string) {
    this.router.navigate([path])
      .then(function () {
        console.log('success to Path: ', path);
      }).catch(function (){
      console.log('failure to Path: ', path);
    });
  }
}
