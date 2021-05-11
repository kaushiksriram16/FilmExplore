import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  // API link of TMdb which is used to fetch recent popular movies:
  ApiLink =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=57f0bfdee1dd128bce2040054c456112';

  // Link to fetch poster image for the TMdb API:
  ImgLink = 'https://image.tmdb.org/t/p/w500';

  // Initialising an array inorder to populate the data which will be fetched from API
  PopularMovies: any[];

  // Function which carries out the process of fetching data from the API and populating that data into our Array: 
  getMovieData() {
    fetch(this.ApiLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.PopularMovies = data.results;
      });
  }

  // Function inorder to save the popular movies to the bookmarks:
  saveMoviesLocal(title, year, poster, imdbId) {

    let Movie = {
      Title: title,
      Year: year,
      Poster: poster,
      ImdbId: imdbId,
    };
    let BookmarkedMovies = [];
    let Ids = [];

    if (localStorage.getItem('BookmarkedMovies')) {
      BookmarkedMovies = JSON.parse(localStorage.getItem('BookmarkedMovies'));
      Ids = JSON.parse(localStorage.getItem('Ids'));
      if (!Ids.includes(Movie.ImdbId)) {
        BookmarkedMovies = [Movie, ...BookmarkedMovies];
        Ids = [Movie.ImdbId, ...Ids];
        Swal.fire({
          title: 'Bookmarked!',
          text: 'Succesfully Added to your Library',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Exists!',
          text: 'This movie is already added to Bookmarks',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    } else {
      BookmarkedMovies = [Movie];
      Ids = [Movie.ImdbId];
    }
    localStorage.setItem('BookmarkedMovies', JSON.stringify(BookmarkedMovies));
    localStorage.setItem('Ids', JSON.stringify(Ids));
  }

  constructor() {}

  ngOnInit(): void {

    // this function will be called as the page loads: 
    this.getMovieData();
  }

}
