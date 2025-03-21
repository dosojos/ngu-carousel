import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { slider } from '../slide-animation';
import {
  NguItemComponent,
  NguCarouselPrevDirective,
  NguCarouselDefDirective,
  NguCarouselNextDirective,
  NguCarousel
} from '@ngu/carousel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NguCarousel,
    NguCarouselPrevDirective,
    NguCarouselDefDirective,
    NguItemComponent,
    NguCarouselNextDirective
  ]
})
export class BannerComponent {
  images = ['assets/bg.jpg', 'assets/car.png', 'assets/canberra.jpg', 'assets/holi.jpg'];
  carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    custom: 'banner',
    loop: true,
    touch: true, // touch is not currently in active for vertical carousel, will enable it in future build
    vertical: {
      enabled: false,
      height: 400
    }
  };
  tempData: any[];

  public items = signal<string[]>([]);

  constructor() {
    this.addItem();
    afterNextRender(() => {
      const id = setInterval(() => {
        this.addItem();
        if (this.items().length >= 30) {
          clearInterval(id);
        }
      }, 500);
    });
  }

  addItem() {
    const i = Math.floor(Math.random() * this.images.length);
    this.items.update(items => [...items, this.images[i]]);
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: any) {
    console.log(data);
  }

  trackCarousel(_, item) {
    return item;
  }
}
