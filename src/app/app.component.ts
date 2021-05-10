import { ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  movieTitle: string;

  ApiLink =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=57f0bfdee1dd128bce2040054c456112';

  ImgLink =
    'https://image.tmbd.org/t/p/w500&api_key=57f0bfdee1dd128bce2040054c456112';

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
}

