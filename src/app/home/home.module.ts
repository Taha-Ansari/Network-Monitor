import { SpinnerComponent } from './../shared/components/spinner/spinner.component';
import { NetworkService } from './../core/services/network.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { NetworkComponent } from './network/network.component';
import { NetworkCardComponent } from './network/network-card/network-card.component';
import { DeviceComponent } from './device/device.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, NetworkComponent, NetworkCardComponent, DeviceComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  providers: [NetworkService]
})
export class HomeModule {}
