import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import {ExtrasService} from '../../extras.service';
import { LoadingController,ToastController, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


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
    public modal:ModalController,
    private Storage:Storage,
    public nav:NavController
    ) { }


  public monedas:number=0;
  public Adress:string;
  public Vestido:number;
  public Compra1:boolean=true;
  public Compra2:boolean=true;
  public Compra3:boolean=true;
  public Fechas:string;
  public arr;
  ngOnInit() {
  
   this.Adress=this.Data.getExtra();
   
   this.connect(this.Adress);
   this.getmonedas();
   this.getVestido();
   this.getvestidos();
  }

  generarFecha(){
    this.Storage.get("FechaMoneda").then((val)=>{
     if(val!=undefined){
      this.arr=val.split(",");
    
     }
    });
  }
  getVestido(){
    this.Storage.get("Vestidos").then((val)=>{
      if(val!=undefined){
        this.Vestido=parseInt(val);
        
      }else{
        this.Vestido=0;
      }
    });
 
  }
  Quitar(){
    this.Vestido=0;
    this.Storage.set("Vestidos",0);
    this.toast("Se ha removido la ropa");
  }
  getvestidos(){
    this.Storage.get("Compra1").then((val)=>{
      if(val!=undefined){
        this.Compra1=false;
      }
    });
    this.Storage.get("Compra2").then((val)=>{
      if(val!=undefined){
        this.Compra2=false;
      }
    });
    this.Storage.get("Compra3").then((val)=>{
      if(val!=undefined){
        this.Compra3=false;
      }
    });
  }

  
  Comprar(Num){
   switch(Num){
     case 1:
     if(this.monedas>=49){
      this.monedas=this.monedas-49;
      this.Storage.set('Monedas',this.monedas);
      this.Storage.set("Compra1",1);
      this.toast("Se ha comprado el objeto");
      this.getvestidos();
     }else{
       this.toast("No alcanza");
     }
     
     break;
     case 2:
     if(this.monedas>=137){
      this.monedas=this.monedas-137;
      this.Storage.set('Monedas',this.monedas);
      this.Storage.set("Compra2",1);
      this.toast("Se ha comprado el objeto");
      this.getvestidos();
     }else{
      this.toast("No alcanza");
     }
     
     break;
     case 3:
     if(this.monedas>=152){
       this.monedas=this.monedas-152;
      this.Storage.set('Monedas',this.monedas);
      this.Storage.set("Compra3",1);
      this.toast("Se ha comprado el objeto");
      this.getvestidos();
     }else{
       this.toast("No alcanza");
     }
     
     break;
   }
   
  }
  Vestir(Num){
    this.Vestido=Num;
    this.Storage.set("Vestidos",Num);
    this.toast("Se ha vestido");
  }
  getmonedas(){
    this.Storage.get('Monedas').then((val)=>{
      if(val==undefined){
       this.monedas=0;
      }else{
       this.monedas=parseInt(val);
      }
     
    });
  }
  
  async AbrirEstadisticas(){
    
    this.generarFecha();
    
  }
  async AbrirPetShop(){
    
    // const modal = await this.modal.create({
    //   component: 
      
    // });
    // return await modal.present();
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
      this.nav.navigateRoot("/bluethoot");
      
    });
  }

  deviceConnected() {
  
    const datos = this.Bluethoot.subscribe('\n').subscribe(success => {
      this.handleData(success);
      this.loading.dismiss();
      this.ref.detectChanges();
    }, error => {
      this.nav.navigateRoot("/bluethoot");
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.Bluethoot.disconnect();

  }

  handleData(data) {
    this.monedas += parseInt(data);
    this.Storage.set('Monedas',this.monedas);
    this.Storage.get("FechaMoneda").then((val)=>{
      if(val!=undefined){
        var displayDate = new Date();
        this.Storage.set("FechaMoneda",val+","+data+"$                        El "+displayDate.toLocaleDateString()+" a alas "+displayDate.toLocaleTimeString()+"");
        
      }else{
        var displayDate = new Date();
        this.Storage.set("FechaMoneda",data+"$                        El "+displayDate.toLocaleDateString()+" a alas "+displayDate.toLocaleTimeString()+",");
        
      }
    });
  }

  async toast(data) {
    const toast = await this.Toastr.create({
      message: data,
      duration: 1000
    });
    return await toast.present();
  }

}
