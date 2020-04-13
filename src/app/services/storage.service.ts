import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Entry {
  name: string;
  email: string;
  visitorName: string;
  entryTime: string;
  exitTime: string;
  created: string;
  purpose: string;
}

const ENTRY_KEY = 'entries';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) { }

  addEntry(entry: Entry): Promise<any> {
    // alert(entry.visitorName);
    return this.storage.get(ENTRY_KEY).then((entries: Entry[]) => {
      if (entries) {
        entries.push(entry);
        return this.storage.set(ENTRY_KEY, entries);
      } else {
       return this.storage.set(ENTRY_KEY, [entry]);
      }
    });
  }

  loadEntries(): Promise<Entry[]> {
    // this.storage.clear();
    return this.storage.get(ENTRY_KEY);
  }
}
