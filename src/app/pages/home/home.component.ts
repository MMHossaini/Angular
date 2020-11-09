import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Router } from '@angular/router';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user$;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor(private authenticationService: AuthenticationService, private route: Router) {
    this.user$ = authenticationService.getUser$();
  }

  ngOnInit() {


    this.options = {
      draggable: { enabled: true },
      resizable: { enabled: true }
      // itemChangeCallback: AppComponent.itemChange,
      // itemResizeCallback: AppComponent.itemResize,
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0 },
      { cols: 2, rows: 2, y: 0, x: 2 },
      { cols: 2, rows: 1, y: 1, x: 0 }
    ];
  }


}
