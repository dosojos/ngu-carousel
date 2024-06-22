import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { slider } from '../slide-animation';
import { AsyncPipe } from '@angular/common';
import {
  NguItemComponent,
  NguCarouselPrevDirective,
  NguCarouselDefDirective,
  NguCarouselNextDirective,
  NguCarousel
} from '@ngu/carousel';

@Component({
  standalone: true,
  selector: 'app-banner-vertical',
  templateUrl: './banner-vertical.component.html',
  styleUrls: ['./banner-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slider],
  imports: [
    NguCarousel,
    NguCarouselPrevDirective,
    NguCarouselDefDirective,
    NguItemComponent,
    NguCarouselNextDirective,
    AsyncPipe
  ]
})
export class BannerVerticalComponent {
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
      enabled: true,
      height: 400
    }
  };
  tempData: any[];

  public carouselTileItems$: Observable<number[]>;

  constructor() {
    this.tempData = [];

    this.carouselTileItems$ = interval(500).pipe(
      startWith(-1),
      take(30),
      map(() => {
        const data = (this.tempData = [
          ...this.tempData,
          this.images[Math.floor(Math.random() * this.images.length)]
        ]);

        return data;
      })
    );
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: any) {
    console.log(data);
  }
}
