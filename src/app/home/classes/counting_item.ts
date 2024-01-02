import {Input} from "@angular/core";

export class CountingItem{
  id: number;
  feature_name: string = "";
  count_number: number = 0;
  how_much_percentage_increased: number = 0.0;
  range_of_time_day: number = 0;

  constructor(id: number, feature_name: string, count_number: number, how_much_percentage_increased: number, range_of_time_day: number) {
    this.id = id;
    this.feature_name = feature_name;
    this.count_number = count_number;
    this.how_much_percentage_increased = how_much_percentage_increased;
    this.range_of_time_day = range_of_time_day;
  }

}
