import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pet', loadChildren: './paginas/pet/pet.module#PetPageModule' },
  { path: 'bluethoot', loadChildren: './paginas/bluethoot/bluethoot.module#BluethootPageModule' },
  { path: 'shop', loadChildren: './paginas/shop/shop.module#ShopPageModule' },
  { path: 'stadistics', loadChildren: './paginas/stadistics/stadistics.module#StadisticsPageModule' }

];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
