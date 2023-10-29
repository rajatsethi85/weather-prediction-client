import {Component, OnInit} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private updateService: SwUpdate) {
  }
  title = 'weather-prediction';
  ngOnInit() {
    if(!this.updateService.isEnabled) {
      return;
    }
    this.handleUpdates();
  }

  handleUpdates() {
    this.updateService.available.subscribe((event) => {
      console.log(event);
      if(event.type === "UPDATE_AVAILABLE") {
        const confirmation = confirm("New version of this app is available. Click ok to reload else cancel.");
        if (confirmation) {
          window.location.reload();
        }
      }
    });

  }
}
