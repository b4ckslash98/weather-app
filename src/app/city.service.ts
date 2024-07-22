import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cities: string[] = [];

  constructor() {
    this.cities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')!) : [];
  }

  getCities(): string[] {
    return this.cities;
  }

  updateCities(cities: string[]) {
    this.cities = cities;
    localStorage.setItem('cities', JSON.stringify(cities));
    this.cityChanged.emit(cities);
  }

  cityChanged: EventEmitter<string[]> = new EventEmitter();
}