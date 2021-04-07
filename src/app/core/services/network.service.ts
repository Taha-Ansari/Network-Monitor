import { Injectable, OnDestroy } from '@angular/core';
import { timer, from , Observable, of, empty } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fs from 'fs';

const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap';

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnDestroy{

  currentScan: any;
  constructor(
    private host: string,
    private subnet: string,
    private timer: number
  ) {}

  async pulse_scan(): Promise<Array<any>> {

      let scan = new nmap.NmapScan(this.host + "/" + this.subnet, '-sP --max-parallelism 100');

      const scanValues: any = await new Promise((resolve, reject) => {
        scan.on('complete', resolve);
        scan.on('error', reject);
        scan.startScan();
      });

      return scanValues;
  }

  saveDeviceData(macAddress: string, data: string) {
    // if(fs.existsSync('db.json')) {
    //   fs.rea
    // }

  }

  get_json(): Observable<any[]> {

    return timer(0, this.timer).pipe(
      switchMap(() => from(this.pulse_scan())),
      map((scan) => {

      const newScan = scan;

      const isDiff = !(JSON.stringify(newScan) === JSON.stringify(this.currentScan));

      if(isDiff) {
        this.currentScan = newScan as Array<any>;
        return newScan;
      }
      return this.currentScan;
    }),
    catchError(error => {console.log(error); return empty()})
    );
  }

  ngOnDestroy(): void { }
}
