import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url = 'http://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=d4a841ddb7ab4eec9a056c6cb385af1c';
  // apikey = 'd4a841ddb7ab4eec9a056c6cb385af1c';

  constructor(private http: HttpClient) { }

  getNews()  {
    return new Promise((resolve, reject) => {
      this.http.get(this.url)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
