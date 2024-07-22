import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private cityChangeSubject = new Subject<string[]>();

  cityChange$ = this.cityChangeSubject.asObservable();

  emitCityChange(cities: string[]) {
    this.cityChangeSubject.next(cities);
  }
}