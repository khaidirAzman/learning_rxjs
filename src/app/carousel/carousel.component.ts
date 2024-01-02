import {Component, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgbCarouselModule, FormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  images = [944, 1011, 984]
    .map((n) => `https://picsum.photos/id/${n}/900/500`);
}
