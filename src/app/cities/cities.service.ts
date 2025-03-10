import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  readonly cities = httpResource.text("/cities.csv", {
    parse: this.parse,
  });

  private parse(csv: string): string[] {
    const rows = csv.split('\n').map(row => row.split(',').map(cell => cell.trim()));
    const header = rows[0];
    const columnIndex = header.indexOf('"city"');
    
    if (columnIndex === -1) return [];

    return [...new Set(rows.slice(1).map(row => row[columnIndex].replaceAll('"', '')))];
  }
}
