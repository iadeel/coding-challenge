import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ResponseData {
    name: string;
    gender: string;
    age: number;
    pets: [{
        name: string;
        type: string;
    }]
}

export interface Pet {
    name: string,
    type: string
}

@Injectable()
export class AppComponentService {

    constructor(private http: HttpClient) {
    }

    getPetData() {
        return this.http
            .get<ResponseData[]>("http://agl-developer-test.azurewebsites.net/people.json")
            .pipe(
                map((res) => res),
                map((data) => {
                    return data.map((owner) => {
                        return {
                            gender: owner.gender,
                            cats: owner.pets?.filter(x => x.type == "Cat"),
                        };
                    });
                }));
    }
}
