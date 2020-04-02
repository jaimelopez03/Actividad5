import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotesService } from '../services/notes.service';
import { EditModalPage } from '../edit-modal/edit-modal.page';
import { AddNotePage } from '../add-note/add-note.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private modalctrl: ModalController,
              private afAuth: AngularFireAuth,
              private notesService: NotesService,
              private afs: AngularFirestore,
              private alertController: AlertController ) {
    this.getFormattedDate();
  }

  formattedDate;
  segmento: string;
  display = false;

  notas = this.notesService.notas;

  ngOnInit() {
    this.getNotes();
  }

  async presentAlert(Header, SubHeader, Message) {
    const alert = await this.alertController.create({
      header: Header,
      subHeader: SubHeader,
      message: Message,
      buttons: ['OK']
    });
    await alert.present();
  }



  checkChanged(index, checkedStatus) {
    const temp = {todo: this.notesService.notas[index].todo,
                  id: this.notesService.notas[index].id,
                  isChecked: !this.notesService.notas[index].isChecked
                };
    this.presentAlert("Well Done!", "", "Very good. one more to-do done. Keep going!");
    //this.notesService.notas[index].isChecked = this.notesService.notas[index].isChecked;
    this.notesService.updateNote(this.notesService.notas[index].id, temp).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }



  deleteNote(index) {
    this.notesService.deleteNote(this.notesService.notas[index].id).then(() => {
    this.presentAlert("Success!", "", "Your To-Do has been deleted succesfully");
    }).catch((error) => {
      console.log(error);
    });
  }

  async editModal(id) {
    const modal = await this.modalctrl.create({
      component: EditModalPage,
      componentProps: {
        id: this.notesService.notas[id].id,
        isChecked: this.notesService.notas[id].isChecked
      }
    });

    await modal.present();
  }
  async addModal() {
    const modal = await this.modalctrl.create({
      component: AddNotePage
    });

    await modal.present();
  }

  ionViewWillEnter() {
    this.segmento = 'todo';
  }
  logOut(): void {
    this.afAuth.auth.signOut();
  }
  // Esto es para cambiar display
  updateDisplay() {
    this.display = !this.display;
  }

  getFormattedDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear().toString();
    const month  = dateObj.getMonth().toString();
    const date = dateObj.getDate().toString();
    // tslint:disable-next-line: max-line-length
    const monthArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.formattedDate = date + '  ' + monthArray[month] + ' ' + year;
  }
  // Obtener notas
  getNotes() {
    this.notesService.getNotes().subscribe((notes) => {
      // notes.forEach(note => this.notesService.notas.push(note));
      this.notesService.notas = notes;
      this.notas = this.notesService.notas;
      
      notes.forEach(element => console.log(element));
    });
  }
}




