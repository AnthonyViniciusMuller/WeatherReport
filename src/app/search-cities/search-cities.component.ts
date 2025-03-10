import { Component, computed, inject, model, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CitiesService } from '../cities/cities.service';

@Component({
  selector: 'app-search-cities',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-cities.component.html',
  styleUrl: './search-cities.component.scss'
})
export class SearchCitiesComponent {
  LIMIT = 5
  readonly citiesService = inject(CitiesService);

  search = model('', {
    alias: "city"
  });
  options = computed(() => this.filter());
  chooseCity = output<string>();

  private filter() {
    const cities = this.citiesService.cities.value();
    if (!cities) return [];
  
    const searchTerm = this.search().toLowerCase();
    const results: string[] = [];
    
    for (const city of cities) {
      if (city.toLowerCase().includes(searchTerm)) {
        results.push(city);
        if (results.length === this.LIMIT) break;
      }
    }
  
    return results;
  }
}
