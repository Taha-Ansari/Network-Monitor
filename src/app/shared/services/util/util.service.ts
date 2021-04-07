import { Injectable } from '@angular/core';
import * as os from 'os';


export interface IPAddress {
  ip: string,
  mac: string,
  subnet: string
};

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  static getCurrentIPAddres(): IPAddress {

    const ifaces = os.networkInterfaces();
    let deviceIpAddress;

    Object.keys(ifaces).forEach((element) => {

     const deviceInterfaces = ifaces[element].filter(details => details.family === 'IPv4' && details.internal !== true);

     if(deviceInterfaces.length > 0) {
      deviceIpAddress = deviceInterfaces[0];
     }

    });

    return { ip: deviceIpAddress.address, subnet: deviceIpAddress.cidr.split('/')[1], mac: deviceIpAddress.mac}
  }

  constructor() { }
}
