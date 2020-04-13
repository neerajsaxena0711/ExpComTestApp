import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService, Entry } from '../services/storage.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  todaysDate: string;
  newEntry: Entry = {} as Entry;
  purposeOfMeet = 'meeting';
  minDate = '1: 20';

  get name() {
    return this.entryForm.get('name');
  }

  get email() {
    return this.entryForm.get('email');
  }

  get purpose() {
    return this.entryForm.get('purpose');
  }

  get visitorName() {
    return this.entryForm.get('visitorName');
  }

  get entryTime() {
    return this.entryForm.get('entryTime');
  }

  get exitTime() {
    return this.entryForm.get('exitTime');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'email is required' },
      { type: 'pattern', message: 'Please enter a valid email!' }
    ],
    visitorName: [
      { type: 'required', message: 'Visitor name is required' },
      { type: 'maxlength', message: 'Vistor name cant be longer than 100 characters' }
    ],
    purpose: [
      { type: 'required', message: 'Purpose is required' }
    ],
    entryTime: [
      { type: 'required', message: 'entry time is required' },
    ],
    exitTime: [
      { type: 'required', message: 'exit time is required' },
    ]
  };


  entryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    visitorName: ['', [Validators.required, Validators.maxLength(50)]],
    purpose: ['', [Validators.required]],
    entryTime: ['', [Validators.required]],
    exitTime: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private toastController: ToastController) {
    this.todaysDate = new Date().toISOString();
  }

  public submit() {
    // console.log(    this.entryForm.valid);
    this.addEntry();
  }

  addEntry() {
    this.newEntry.created = this.todaysDate;
    this.newEntry.name = this.entryForm.value.name;
    this.newEntry.email = this.entryForm.value.email;
    this.newEntry.purpose = this.entryForm.value.purpose;
    this.newEntry.visitorName = this.entryForm.value.visitorName;
    this.newEntry.entryTime = this.entryForm.value.entryTime;
    this.newEntry.exitTime = this.entryForm.value.exitTime;
    this.storageService.addEntry(this.newEntry).then(entry => {
      this.showToast('Entry added');
      this.entryForm.reset();
    }).catch((err) => {
      this.showToast('Something went wrong!');
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  minStartDate(): string {
    return moment().format('YYYY-MM-DD');
  }
  minEndDate(): string {
    return moment(this.entryTime.value).add(1, 'day').format('YYYY-MM-DD');
  }

}
