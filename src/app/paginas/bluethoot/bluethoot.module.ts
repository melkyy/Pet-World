import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BluethootPage } from './bluethoot.page';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const routes: Routes = [
  {
    path: '',
    component: BluethootPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ],
  declarations: [BluethootPage]
})
export class BluethootPageModule {}
