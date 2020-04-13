import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  loading: any;
  results: Observable<any>;
  constructor(private news: NewsService, private loadingController: LoadingController) {
    this.getNews();
  }


  getNews() {
    this.presentLoading();
    this.news.getNews().then((result: any) => {
      if (result.status === 'ok' ) {
        this.results = result.articles;
        this.loading.dismiss();
      }
    }).catch((err) => {
      console.log(err);
      this.loading.dismiss();
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading',
      duration: 2000
    });
    await this.loading.present();
  }
}
