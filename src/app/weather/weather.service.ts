import { HttpClient, httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { outputToObservable, rxResource, toObservable } from '@angular/core/rxjs-interop';
import { map, merge, tap } from 'rxjs';

interface Weather {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level: number;
	grnd_level: number;
}

interface OpenWeatherResponse {
  main: Weather,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.openWeatherApiKey;
  private apiUrl = environment.openWeatherApiUrl;

  readonly city = signal<string | null>(null);
  readonly coordinatesCity = signal<string | null>(null);
  readonly coordinates = signal<GeolocationCoordinates | null>(null);
  
  readonly weatherByCity = httpResource<OpenWeatherResponse>(() => this.weatherByCityFn());
  readonly weatherByCoordinates = httpResource<OpenWeatherResponse>(() => this.weatherByCoordinatesFn())
  
  readonly weather$ = merge(
    toObservable(this.weatherByCity.value), 
    toObservable(this.weatherByCoordinates.value)
  ).pipe(
    tap(value => this.coordinatesCity.set(value?.name || null)), 
    map(value => value?.main)
  );

  readonly isLoading$ = merge(
    toObservable(this.weatherByCity.isLoading), 
    toObservable(this.weatherByCoordinates.isLoading)
  )

  constructor() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => this.coordinates.set(position.coords), 
      (_) => this.city.set('São Paulo'),
    );
  }

  private weatherByCoordinatesFn() {
    const coordinates = this.coordinates();
    if (!coordinates) {
      return;
    }

    const { latitude, longitude } = coordinates;
    
    return `${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
  }

  private weatherByCityFn() {
    const city = this.city();
    if (!city) {
      return;
    }

    return `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  }
}
