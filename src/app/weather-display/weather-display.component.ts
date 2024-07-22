import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CityService } from '../city.service';
import { CitySelectorComponent } from '../city-selector/city-selector.component';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnChanges {
  @Input() cities: string[] = [];
  weatherData: any[] = [];
  @Output() removedCity = new EventEmitter<string[]>();

  private apiKey = environment.weatherApiKey;
  private apiUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient, private cityService: CityService) {
    this.cityService.cityChanged.subscribe((citu: string[]) => {
      this.weatherData = [];
      this.cities.forEach(city => {
        this.getWeather(city).subscribe(data => {
          this.weatherData.push(data);
        });
      });
    })
  }

  ngOnChanges(): void {
    // if (changes['cities']) {
      this.weatherData = [];
      this.cities.forEach(city => {
        this.getWeather(city).subscribe(data => {
          this.weatherData.push(data);
        });
      });
    // }
  }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`);
  }

  removeCity(city: string) {
    this.cities = this.cities.filter(c => c.toLowerCase() !== city.toLowerCase());
    localStorage.setItem('cities', JSON.stringify(this.cities));
    this.cityService.updateCities(this.cities);
    this.weatherData = this.weatherData.filter(data => data.location.name !== city);
    this.removedCity.emit(this.cities);
  }
}
