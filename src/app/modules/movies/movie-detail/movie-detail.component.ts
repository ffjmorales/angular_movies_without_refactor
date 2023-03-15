import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from 'src/app/model/movie.model';
import { MoviesModel } from 'src/app/model/movies.model';
import { ApiService } from 'src/app/services/api.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ConstantUri } from 'src/app/utils/constantUri';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent extends BaseComponent<MovieModel.Movie> implements OnInit{
  movie!: MovieModel.Movie;
  readonly imgBaseUrl = ConstantUri.pathImg;
  override set setResponseService(val : MovieModel.Movie){
    this.movie=val;
  }
  constructor(
    protected readonly apiService: ApiService<MovieModel.Movie>,
    private readonly activeRoute: ActivatedRoute,
    private readonly route: Router,
  ){
    super(apiService);
  }

  override ngOnInit(): void {
    this.activeRoute.params.subscribe((val : any) => {
      this.getMoviesList(val.id);
    })
  }

  getMoviesList(movieId: string){   
    this.paramsConfig.url = ConstantUri.movieDetail + '/' + movieId;
    this.paramsConfig.params.api_key = ConstantUri.apiKey;
    this.getRequest();
  }
  goBack(){
    this.route.navigate(['/populares']);
  }
}
