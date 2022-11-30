import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Convert } from './convert';

@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrls: ['./convertisseur.component.css']
})
export class ConvertisseurComponent implements OnInit, OnDestroy {
  taux:number = 1.1;
  price: number;
  convertedprice:number;
  actualdevice:string='€'
  device:string='$'
  start=false;
  timer:any;
  activeswitch = false;
  activeforce = false;
  force:number;
  converted:Convert=new Convert()
  historyvals:Convert[]=[];


  constructor() { }

  ngOnInit(): void {
  }
  convert(){
    this.convertedprice = this.price*this.taux;
    this.timer = setInterval(() => {
      this.start = true
      this.taux = 1.1 + this.entierAleatoire();
      if(this.actualdevice == '$'){
        this.taux = 1/this.taux;
      }
      this.activeforce = this.activeForce();
      if (!this.activeforce){
        this.convertedprice = this.price*this.taux;
      }
      else{
        this.convertedprice = this.price*this.force;
      }
      this.converted.actualdevice = this.actualdevice;
      this.converted.taux = this.taux;
      this.converted.convertedprice = this.convertedprice;
      this.converted.force = this.force;
      this.converted.device = this.device;
      this.converted.price = this.price;
      this.historyvals.push(Object.assign({}, this.converted));
      if (this.historyvals.length > 5){
        this.historyvals.splice(0,1);
      }
    }, 3000);
  }

  entierAleatoire()
  {
    return (Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1))/100;
  }

  switch(){
    this.price= this.convertedprice;
    if (this.device == '€'){
      this.actualdevice = '€'
      this.device = '$'
      this.activeswitch = false;
    }
    else{
      this.activeswitch = true;
      this.actualdevice = '$'
      this.device = '€'
    }
  }

  pause() {
    clearInterval(this.timer);
    this.start=false;
  }

  activeForce(){
    let marge = this.taux*0.2;
    if ((this.taux - marge) < this.force &&  this.force < (this.taux + marge)){
      return true;
    }
    return false;
  }

  ngOnDestroy() { 
	  clearInterval(this.timer);
  }

}
