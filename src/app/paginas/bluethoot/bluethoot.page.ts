import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';
import {ModalController} from '@ionic/angular';
import {ModalShopPage} from '../modal-shop/modal-shop.page';


@Component({
  selector: 'app-bluethoot',
  templateUrl: './bluethoot.page.html',
  styleUrls: ['./bluethoot.page.scss'],
})
export class BluethootPage implements OnInit {

  pairedList:pairedList;
  pairedDeviceID:number=0;
  listToggle:boolean=true;
  DataSend:string;
  Conectado:boolean=false;
  monedas:number=0;
  constructor(private Bluethoot: BluetoothSerial,private toastCtrl: ToastController, public modalController:ModalController ) { }

  ngOnInit() {
   
    this.checkBluetoothEnabled();
  }

  Mostrar(){
    this.toast("jalo");
  }
async MostrarModal(){  
  const modal=await this.modalController.create({
    component:ModalShopPage
  });
  return await modal.present();
}
  checkBluetoothEnabled() {
    this.Bluethoot.isEnabled().then(success => {
      this.listPairedDevices();
      
    }, error => {
      this.toast("No esta conectado");
      this.Conectado=false;
    });
  }
  listPairedDevices(){
    this.Bluethoot.list().then(success=>{
      this.pairedList=success;
      this.listToggle=true;
    },error=>{
      this.toast("Inicializa Bluethoot")
      
    });

  }

  selectDevice(){
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.toast("Selecciona dispositivo para conectar")
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);

  }
  connect(address){
    this.Conectado=true;
    this.Bluethoot.connect(address).subscribe(success => {
      this.deviceConnected();
      this.toast("Dispositivo conectado");
    }, error => {
      this.toast("Error al conectar el dispositivo");
      this.Conectado=false;
    });
  }   

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.Bluethoot.subscribe('\n').subscribe(success => {
     
      this.handleData(success);
    }, error => {
      this.Conectado=false;
      this.showError(error);
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.Bluethoot.disconnect();
    
  }

  handleData(data) {
      this.monedas+=parseInt(data);
      this.toast("Se ha agregado una moneda a la alcancia!");
  }

  showError(error) {
    this.toast(error);
  }
  async toast(data){
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 1000
    });
   return await toast.present();
  }

}
interface pairedList{
"class":number,
"id":string
"adress":string,
"name":string 
}

interface Pet{
  "idAccesorio":number
}