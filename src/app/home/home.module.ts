import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { EditModalPage } from '../edit-modal/edit-modal.page';
import { EditModalPageModule } from '../edit-modal/edit-modal.module';
import { AddNotePageModule } from '../add-note/add-note.module';
import { AddNotePage } from '../add-note/add-note.page';

@NgModule({
  entryComponents: [
    EditModalPage,
    AddNotePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    EditModalPageModule,
    AddNotePageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
