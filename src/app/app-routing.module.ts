import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'bluethoot', loadChildren: './paginas/bluethoot/bluethoot.module#BluethootPageModule' },
  { path: 'modal-shop', loadChildren: './paginas/modal-shop/modal-shop.module#ModalShopPageModule' }
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
