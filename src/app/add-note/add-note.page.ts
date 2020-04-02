import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage {

  constructor(private notesService: NotesService,
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


  createNote(input: HTMLIonInputElement) {
    const tempNota = {todo: input.value , isChecked: false};
    this.notesService.notas.push(tempNota);
    this.notesService.createNote(tempNota).then(() => {
      console.log('Note created');
      this.presentAlert("Success!", "", "Your To-Do has been created succesfully");
    }).catch((error) => {
      console.log(error);
    });
  }
}
