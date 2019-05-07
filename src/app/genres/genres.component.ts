import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../movies.service';
import {PagerService} from '../pager.service';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  title: string;
  movies: Object;
  currentPage:1;
  private allItems;
   // pager object
   pager: any = {};
   // paged items
   pagedItems: any[];
   searchRes: Array<Object>;
  searchStr: string;
   id;
  constructor(
    private _moviesServices: MoviesService,
    private pagerService:PagerService, 
    private router: ActivatedRoute ) {

  }



  ngOnInit() {
    this.router.params.subscribe((params) => {
       this.id = params['id'];
      this.title = params['name'];
      this._moviesServices.getMoviesByGenre(this.id).subscribe(res => {
        this.movies = res.results;
        this.allItems=this.movies;
        this.setPage(1);
      });
    })
  }
  searchMovies() {
    this._moviesServices.searchMovies(this.searchStr).subscribe(res => {
      this.searchRes = res.results;
    })
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
