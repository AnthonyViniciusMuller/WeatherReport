import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather/weather.service';
import { FormsModule } from '@angular/forms';
import { merge } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private weatherService = inject(WeatherService);

  readonly city = linkedSignal(() => this.weatherService.coordinatesCity());

  readonly weather = toSignal(this.weatherService.weather$);
  readonly isLoading = toSignal(this.weatherService.isLoading$);

  updateCity() {
    this.weatherService.city.set(this.city());
  }

  getByCoordinates() {
    this.weatherService.weatherByCoordinates.reload();
  }
}
