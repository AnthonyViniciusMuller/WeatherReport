import { Component, inject, linkedSignal, WritableSignal } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { FormsModule } from '@angular/forms';
import { SearchCitiesComponent } from "./search-cities/search-cities.component";
import { LabelComponent } from "./label/label.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    SearchCitiesComponent,
    LabelComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private weatherService = inject(WeatherService);

  readonly weather = this.weatherService.weather;
  readonly city: WritableSignal<string> = linkedSignal({
    source: () => this.weather.value()?.name,
    computation: (newValue, old) => newValue || old?.source || "",
  });

  changeCity(city: string) {
    this.weatherService.city.set(city);
  }

  getByCoordinates() {
    this.weatherService.getByLocation();
  }
}
