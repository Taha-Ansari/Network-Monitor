import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';

const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap';

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnDestroy{

  subject = new BehaviorSubject(null);
  IntervalSubscription: Subscription;
  currentScan: any;
  constructor(private host: string, private subnet: string, private timer: number){
  }
  
  async pulse_scan(){        
      let scan = new nmap.NmapScan(this.host + "/" + this.subnet, '-sP');
      scan.start();
      let complete = await scan.on('complete');
      let error = await scan.on('error');

      if(complete){
        complete = this.currentScan;
        return complete;
      }

      if (error){
        console.log(error);
      }
  }
  
  async init_data(){
    this.currentScan = await this.pulse_scan();
    this.update_json();    
  }

  update_json(){
    this.IntervalSubscription =  interval(this.timer).subscribe( async () => {
      const newScan = await this.pulse_scan();
      const isDiff = !(JSON.stringify(newScan) === JSON.stringify(this.currentScan))
      if(isDiff) {
        this.currentScan = newScan;
        this.subject.next(this.currentScan);
      } 
    });
  }

  set set_host(ip:string){
      this.host = ip;
  }
  
  set set_subnet(subnet:string){
      this.subnet = subnet;
  }
  
  get get_device_data(){
      return JSON;
  }

  ngOnDestroy():void {
    if(!this.IntervalSubscription.closed) {
      this.IntervalSubscription.unsubscribe();
    }

  }
}
