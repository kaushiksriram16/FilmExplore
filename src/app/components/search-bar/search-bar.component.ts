import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  // Initialising array to populate movies which we will get on searching:
  Movies: any[];

  // API link of TMdb which is used to fetch the movies which the user searches:
  getMovieData(val) {
    fetch('https://omdbapi.com/?apikey=9848bbf1&type=movie&r=json&s=' + val)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.Movies = data.Search;
      });
  }

  // Function inorder to save the movies to the bookmarks which are fetched on searching:
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

  ngOnInit(): void {}
}
