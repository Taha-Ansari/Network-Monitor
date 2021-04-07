import { Observable } from 'rxjs';
import { NetworkService } from './../../core/services/network.service';
import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../shared/services/util/util.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  nodes: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    const currentIpAdress = UtilService.getCurrentIPAddres();
    const networkService = new NetworkService(
      currentIpAdress.ip,
      currentIpAdress.subnet,
      60000);

      console.log('created');

    this.nodes = networkService.get_json();
  }

}
