import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})
export class CitySelectorComponent {
  cities: string[] = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')!) : [];
  newCity: string = '';
  @Output() citiesChanged = new EventEmitter<string[]>();

  constructor(private cityService: CityService) {
  }

  ngOnInit(): void {
    if (this.cities) {
      this.citiesChanged.emit(this.cities);
    }
  }

  onRemovedCity(cities: string[]) {
    localStorage.setItem('cities', JSON.stringify(cities));
  }

  addCity() {
    this.cities.push(this.newCity);
    localStorage.setItem('cities', JSON.stringify(this.cities));
    this.cityService.updateCities(this.cities);
    this.newCity = '';
    this.citiesChanged.emit(this.cities);
  }
}
