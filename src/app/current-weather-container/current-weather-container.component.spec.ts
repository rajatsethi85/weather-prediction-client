import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherContainerComponent } from './current-weather-container.component';

describe('CurrentWeatherContainerComponent', () => {
  let component: CurrentWeatherContainerComponent;
  let fixture: ComponentFixture<CurrentWeatherContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
