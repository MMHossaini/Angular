import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort } from "@angular/material";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { debug } from "util";

export interface PeriodicElement {
  name: string;
  title: string;
  weight: number;
  // symbol: string;
}
@Component({
  selector: "app-leage-of-legends",
  templateUrl: "./leage-of-legends.component.html",
  styleUrls: ["./leage-of-legends.component.scss"]
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

  async ngOnInit() {
    let data = await this.getChampions();
    this.dataSource = new MatTableDataSource(Object.values(data));

    //stackoverflow.com/a/52938020/889376
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property.includes("."))
        return property.split(".").reduce((o, i) => o[i], item);
      return item[property];
    };

    this.dataSource.sort = this.sort;
  }

  async getChampions() {
    let champions = [];

    // if (champions != null) {
    //   return champions;
    // }

    // call riot api
    let result = await this.http
      .get(
        "http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json"
      )
      .toPromise();
    champions = result["data"];

    // save result
    // window.localStorage.setItem("champions", champions);

    return champions;
  }
  constructor(private route: Router, private http: HttpClient) {}
}
