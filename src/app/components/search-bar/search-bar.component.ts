import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {NgModule} from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  constructor(private http: HttpClient) {}

  Movies: any[];

  getMovieData(val) {
    fetch('http://omdbapi.com/?apikey=9848bbf1&type=movie&r=json&s=' + val)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.search);
         this.Movies = data.Search;
         console.log(this.Movies);
      }) ;
  }

  saveMoviesLocal(title, year, poster,imdbId){
        let Movie = {
          Title: title,
          Year: year,
          Poster: poster,
          ImdbId: imdbId,
        }
        let BookmarkedMovies = [];
        let Ids = [];

        if(localStorage.getItem('BookmarkedMovies')){
            BookmarkedMovies = JSON.parse(localStorage.getItem('BookmarkedMovies'));
            Ids = JSON.parse(localStorage.getItem('Ids'));
            if (!Ids.includes(Movie.ImdbId)){
              BookmarkedMovies = [Movie, ...BookmarkedMovies];
              Ids = [Movie.ImdbId, ...Ids];
               Swal.fire({
                 title: 'Bookmarked!',
                 text: 'Succesfully Added to your Library',
                 icon: 'success',
                 confirmButtonText: 'OK',
               });
            }else{
              Swal.fire({
                title: 'Exists!',
                text: 'This movie is already added to Bookmarks',
                icon: 'warning',
                confirmButtonText: 'OK',
              });
            }   
        }else{
          BookmarkedMovies = [Movie]; 
          Ids = [Movie.ImdbId];
        }
        localStorage.setItem('BookmarkedMovies', JSON.stringify(BookmarkedMovies));
        localStorage.setItem('Ids', JSON.stringify(Ids));
    }

  ngOnInit(): void {}
}
