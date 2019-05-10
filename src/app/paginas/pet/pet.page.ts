import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import {ExtrasService} from '../../extras.service';
import { LoadingController,ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import{ShopPage}from '../shop/shop.page';
import {StadisticsPage}from '../stadistics/stadistics.page'
@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  constructor(private Modal:ModalController,
    private Bluethoot:BluetoothSerial,
    public ref:ChangeDetectorRef,
    public loading:LoadingController,
    public Data:ExtrasService,
    public Toastr:ToastController,
    public modal:ModalController
    ) { }


  public monedas:number=0;
  public Adress:string;

  ngOnInit() {
   this.Adress=this.Data.getExtra();
   this.connect(this.Adress);
  }

  
  async AbrirEstadisticas(){
    const modal = await this.modal.create({
      component: ShopPage
    });
    return await modal.present();
  }
  async AbrirPetShop(){
    const modal = await this.modal.create({
      component: StadisticsPage
      
    });
    return await modal.present();
  }

  async presentLoading(){
    const loading = await this.loading.create({
      message: 'Cargando'
    });
    await loading.present();
  }

  connect(address) {
    this.presentLoading();
    this.Bluethoot.connect(address).subscribe(async (success) => {
      this.loading.dismiss();
      this.deviceConnected();
    }, error => {
      this.loading.dismiss();
      this.toast("Error al conectar el dispositivo");
      
    });
  }

  deviceConnected() {
  
    const datos = this.Bluethoot.subscribe('\n').subscribe(success => {
      this.handleData(success);
      this.loading.dismiss();
      this.ref.detectChanges();
    }, error => {
      
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.Bluethoot.disconnect();

  }

  handleData(data) {
    this.monedas += parseInt(data);
   
  }

  async toast(data) {
    const toast = await this.Toastr.create({
      message: data,
      duration: 1000
    });
    return await toast.present();
  }

}
