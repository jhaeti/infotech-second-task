import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() userId;
  titles: string[];
  titlesSub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.titlesSub = this.http
      .get<any[]>(
        'https://jsonplaceholder.typicode.com/posts?userId=' + this.userId
      )
      .pipe(
        map((response) => {
          const newRes = [...response];
          return newRes.map((item) => item.title);
        })
      )
      .subscribe((response) => {
        this.titles = [...response];
      });
  }

  ngOnDestroy(): void {
    this.titlesSub.unsubscribe();
  }
}
