import { Component, OnInit ,} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private storage:Storage,public nav:NavController){}

  ngOnInit(){
    
    this.storage.get('Adress').then((val)=>{
      if(val!=undefined){
        this.nav.navigateRoot("/bluethoot");
      }
    });
  }
}
