import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  extras: any;

  constructor() { 
  }

  public setExtra(data){
    this.extras=data;
  }
  public getExtra(){
    return this.extras;
  }
}
