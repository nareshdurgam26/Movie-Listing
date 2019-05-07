import { Component } from '@angular/core';
import {MoviesService} from './movies.service';
import {PagerService} from './pager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoviesService, PagerService]
})
export class AppComponent {
  genres: Array<Object>;
  // pager object
  pager: any = {};

  constructor(private _moviesServices: MoviesService,private pagerService: PagerService) {
    this._moviesServices.getGenres().subscribe(res => {
      this.genres = res.genres.slice(0, 5);
    });
  }

  
}
