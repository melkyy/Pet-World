import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController,NavController } from '@ionic/angular';
import {ExtrasService} from '../../extras.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-bluethoot',
  templateUrl: './bluethoot.page.html',
  styleUrls: ['./bluethoot.page.scss'],
})
export class BluethootPage implements OnInit {

  pairedList: pairedList;
  pairedDeviceID: number = 0;
  listToggle: boolean = true;
  
  constructor(private Bluethoot: BluetoothSerial,
     private ref: ChangeDetectorRef ,
     private toastCtrl: ToastController, 
     public loading:LoadingController,
     private nav:NavController,
     public Data:ExtrasService
     ) { }

  async ngOnInit() {

    this.checkBluetoothEnabled();
    this.listPairedDevices();
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Cargando'
    });
    await loading.present();
  }
  checkBluetoothEnabled() {
    this.Bluethoot.isEnabled().then(success => {
      this.listPairedDevices();
      this.checkBluetoothIsConected();
    }, error => {
      this.toast("No esta conectado a bluethoot");
      
    });
  }

  checkBluetoothIsConected(){
    this.Bluethoot.isConnected().then(success=>{
      this.toast(success);
    },error=>{
      this.toast("Conectese a un dispositivo");
    });
  }
  listPairedDevices() {
    this.Bluethoot.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.toast("Inicializa Bluethoot")
    });

  }

  selectDevice() {
   
     let connectedDevice = this.pairedList[this.pairedDeviceID];
     if (!connectedDevice.address) {
      this.toast("Selecciona dispositivo para conectar");
       return;
     }
    let address = connectedDevice.address;
    this.connect(address);
  }


  AbrirPet() {
   

  }
  connect(address) {
    this.presentLoading();
    this.Bluethoot.connect(address).subscribe(async (success) => {
      this.loading.dismiss();
      this.Data.setExtra(address);
      this.Bluethoot.disconnect();
      this.nav.navigateRoot("/pet");
    }, error => {
      this.loading.dismiss();
      this.toast("Error al conectar el dispositivo");
      
    });
  }

  // deviceConnected() {
  
  //   const datos = 
  //   this.Bluethoot.subscribe('\n').subscribe(success => {
  //     // this.handleData(success);
  //     this.ref.detectChanges();
  //   }, error => {
    
  //     this.loading.dismiss();
  //     // this.showError(error);
  //   });
  // }



  // handleData(data) {
  //   this.monedas += parseInt(data);
   
  // }

  // showError(error) {
  //   this.toast(error);
  // }
  async toast(data) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 1000
    });
    return await toast.present();
  }

}
interface pairedList {
  "class": number,
  "id": string
  "adress": string,
  "name": string
}
