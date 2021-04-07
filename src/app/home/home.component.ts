import { UtilService } from './../shared/services/util/util.service';
import { NetworkService } from './../core/services/network.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showText = false;
  nodes: Observable<any>;

  constructor(private router: Router) { }

  ngOnInit(): void {

    const currentIpAdress = UtilService.getCurrentIPAddres();
    const networkService = new NetworkService(
      currentIpAdress.ip,
      currentIpAdress.subnet,
      60000);

    this.nodes = networkService.get_json().pipe(
      map((resp) => Array.isArray(resp) ? this.getCurrentTopology(resp, currentIpAdress) : null));

  }

  getCurrentTopology(resp, currentIPadress) {

    return resp.map((item, index) => {

      const angle = (Math.PI * 2 / (resp.length - 1)) * index;
      const x = index === 0 ? 0 : Math.cos(angle) * 150;
      const y = index === 0 ? 0 : Math.sin(angle) * 150;

      const initY = window.innerWidth / 4;
      const initX = window.innerHeight / 2;

      return {...item, x: x + initX, y: y + initY, showText: false, mac: item.ip === currentIPadress.ip ? currentIPadress.mac : item.mac} }
      )
  }

}
