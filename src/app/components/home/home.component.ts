import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ApiLink =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=57f0bfdee1dd128bce2040054c456112';

ImgLink =
  'https://image.tmdb.org/t/p/w500';

PopularMovies: any[];

getMovieData() {
  fetch(this.ApiLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.PopularMovies = data.results;
      console.log(this.PopularMovies);
    });

  }

  private search: SearchBarComponent;

  OnSubmit(Title, Year, Poster, imdbID){
    this.search.saveMoviesLocal(Title, Year, Poster, imdbID);
  }


  constructor() { }

  ngOnInit(): void {
    this.getMovieData();
  }

}
