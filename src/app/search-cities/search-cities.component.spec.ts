import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCitiesComponent } from './search-cities.component';

describe('SearchCitiesComponent', () => {
  let component: SearchCitiesComponent;
  let fixture: ComponentFixture<SearchCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
