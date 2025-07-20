import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { RouterLink } from '@angular/router';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  private map: any;

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([45.75, 3.17], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([45.7772, 3.087]).addTo(this.map)
      .bindPopup('Borne de recharge ici')
      .openPopup();
  }

}
