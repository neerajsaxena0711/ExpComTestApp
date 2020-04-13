import { Component } from '@angular/core';
import { StorageService, Entry } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  entryList: Entry[] = [];

  constructor(private storage: StorageService) { }

  ionViewWillEnter() {
    this.loadEntries();
  }

  loadEntries() {
    this.storage.loadEntries().then(entries => {
      this.entryList = entries;
      console.log(JSON.stringify(this.entryList));
    }).catch(err => {
      console.log('Something went wrong');
    });
  }

}
