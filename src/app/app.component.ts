import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserModel } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'email',
    'streetAddress',
    'city',
    'zipCode',
    'companyName',
    'posts',
  ];
  dataSource: UserModel[] = [];
  dataSourceSub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.dataSourceSub = this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((response) => {
          const newRes = [...response];
          return newRes.map((item) => ({
            name: item.name,
            email: item.email,
            streetAddress: item.address.street,
            city: item.address.city,
            zipCode: item.address.zipcode,
            companyName: item.company.name,
            id: item.id,
          }));
        })
      )
      .subscribe((response) => {
        this.dataSource = [...response];
      });
  }

  ngOnDestroy(): void {
    this.dataSourceSub.unsubscribe();
  }
}
