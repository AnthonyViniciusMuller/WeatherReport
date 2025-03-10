import { httpResource } from '@angular/common/http';
import { Injectable, signal, untracked } from '@angular/core';
import { environment } from '../../environments/environment';

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
  readonly coordinates = signal<GeolocationCoordinates | null>(null);

  readonly weather = httpResource<OpenWeatherResponse>(() => this.weatherFn());

  constructor() {
    this.getByLocation();
  }

  getByLocation() {
    if (!navigator.geolocation) {
      return;
    }

    untracked(() => this.city.set(null));
    navigator.geolocation.getCurrentPosition(
      (position) => this.coordinates.set(position.coords), 
      (_) => this.city.set('São Paulo'),
    );
  }

  private weatherFn() {
    const params: Record<string, string | number | boolean> = {
      appid: this.apiKey,
      units: "metric",
    };

    const city = this.city();
    const coordinates = this.coordinates();
    if (city) {
      params["q"] = city;
    } else if(coordinates) {
      params["lat"] = coordinates.latitude;
      params["lon"] = coordinates.longitude;
    } else {
      return undefined;
    }
  
    return {
      url: `${this.apiUrl}`,
      params,
    };
  }
}
