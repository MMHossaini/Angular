import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort } from "@angular/material";

export interface PeriodicElement {
  name: string;
  title: string;
  weight: number;
  // symbol: string;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class LeageOfLegendsComponent {
  displayedColumns: string[] = [
    "name",
    "title",
    "tags",
    "info.difficulty",
    "info.attack",
    "info.defense",
    "info.magic",
    "stats.movespeed",
    "stats.attackrange",
    "stats.armor"
  ];
  dataSource;
  user$;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    // https://stackoverflow.com/a/52938020/889376
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property.includes("."))
        return property.split(".").reduce((o, i) => o[i], item);
      return item[property];
    };

    this.dataSource.sort = this.sort;
  }
  constructor(
    private route: Router
  ) {
  }
}
