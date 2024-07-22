import { Component } from '@angular/core';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CitySelectorComponent, WeatherDisplayComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cities: string[] = [];

  onCitiesChanged(newCities: string[]) {
    this.cities = newCities;
  }
}
