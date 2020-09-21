import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AppComponentService, Pet } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  femaleCats: string[] = [];
  maleCats: string[] = [];

  constructor(private appComponentService: AppComponentService) {
  }

  ngOnInit() {
    this.appComponentService.getPetData().subscribe((data) => {
      this.femaleCats = this.petsSortedByNames(this.catsByOwnerGender('Female', data));
      this.maleCats = this.petsSortedByNames(this.catsByOwnerGender('Male', data));
    });
  }

  catsByOwnerGender(gender: string, data: any): Pet[] {
    return data.filter(item => item.gender === gender && item.cats !== undefined).map(d => {
      return _.flatten([d.cats], true)
    });
  }

  petsSortedByNames(pets: Pet[]): string[] {
    let names: any = [];
    pets.forEach(x => {
      if (!Array.isArray(x))
        names.push(x.name);
      else {
        x.forEach(y => {
          names.push(y.name);
        })
      }
    });
    return names.sort();
  }
}
