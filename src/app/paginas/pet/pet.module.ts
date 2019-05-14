import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PetPage } from './pet.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { IonicStorageModule } from '@ionic/storage';



const routes: Routes = [
  {
    path: '',
    component: PetPage
  }
];

@NgModule({

  imports: [  
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule,IonicStorageModule.forRoot()
  ],entryComponents:[],
  declarations: [PetPage]
  
  
})
export class PetPageModule {}
