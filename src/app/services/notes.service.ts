import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private afs: AngularFirestore,
              private alertController: AlertController) { }
  public notas = [
  ];

  async presentAlert(Header, SubHeader, Message) {
    const alert = await this.alertController.create({
      header: Header,
      subHeader: SubHeader,
      message: Message,
      buttons: ['OK']
    });
    await alert.present();
  }

  createNote(notes: any) {
    return this.afs.collection('notes').add(notes);
  }
  getNotes() {
    return this.afs.collection('notes').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const notes = doc.payload.doc.data() as any;
        const isChecked = false;
        const id = doc.payload.doc.id;
        return{ isChecked, id, ...notes };
      }))
    );
  }
  updateNote(id, data) {
    return this.afs.collection('notes').doc(id).update(data);
  }
  deleteNote(id) {
    return this.afs.collection('notes').doc(id).delete();
  }
}
