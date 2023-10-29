import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureWeatherContainerComponent } from './future-weather-container.component';

describe('FutureWeatherContainerComponent', () => {
  let component: FutureWeatherContainerComponent;
  let fixture: ComponentFixture<FutureWeatherContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureWeatherContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureWeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
