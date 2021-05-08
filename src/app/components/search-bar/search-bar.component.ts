import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  ngOnInit(): void {}
}
