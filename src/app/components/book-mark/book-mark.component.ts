import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-mark',
  templateUrl: './book-mark.component.html',
  styleUrls: ['./book-mark.component.css'],
})
export class BookMarkComponent implements OnInit {
  
  // Assigning the array of Bookmarked movies(movies which are stored locally) to the variable Movies:
  Movies = JSON.parse(localStorage.getItem('BookmarkedMovies'));

  // Assigning the array of Ids of Bookmarked movies(movies which are stored locally) to the variable Ids:
  Ids = JSON.parse(localStorage.getItem('Ids'));

  // Function to remove any movie from bookmarks incase the user wants to remove and clicks on the remove button:
  removeBookmarks(movie) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this movie from Bookmarks?',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
    }).then((response) => {
      if (response.isConfirmed) {
        const indexM = this.Movies.indexOf(movie);
        const indexI = this.Ids.indexOf(movie.ImdbId);
        this.Movies.splice(indexM, 1);
        this.Ids.splice(indexI, 1);
        localStorage.setItem('BookmarkedMovies', JSON.stringify(this.Movies));
        localStorage.setItem('Ids', JSON.stringify(this.Ids));
      }
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
