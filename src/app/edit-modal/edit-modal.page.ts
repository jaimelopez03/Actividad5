import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage {

  @Input() id;
  @Input() isChecked;

  constructor(private notesService: NotesService,
              private navParams: NavParams,
              private alertController: AlertController) { }

  async presentAlert(Header, SubHeader, Message) {
    const alert = await this.alertController.create({
      header: Header,
      subHeader: SubHeader,
      message: Message,
      buttons: ['OK']
    });
    await alert.present();
  }

  updateNote(input: HTMLIonInputElement) {
    const tempNota = {todo: input.value , isChecked: this.navParams.get('isChecked')};
    this.notesService.updateNote(this.navParams.get('id'), tempNota).then(() => {
      console.log('Note Updated');
      this.presentAlert("Success!", "", "Your To-Do has been edited succesfully");
    }).catch((error) => {
      console.log(error);
    });
  }
}
