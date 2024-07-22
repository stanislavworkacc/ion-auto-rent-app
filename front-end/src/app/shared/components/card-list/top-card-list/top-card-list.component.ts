import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'top-card-list',
  templateUrl: './top-card-list.component.html',
  styleUrls: ['./top-card-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopCardListComponent  implements OnInit {

  topCards = [
    { imageUrl: 'assets/icon/atlas-1.jpeg', title: 'Card 1' },
    { imageUrl: 'assets/icon/atlas-2.jpg', title: 'Card 1' },
    { imageUrl: 'assets/icon/atlas-3.jpg', title: 'Card 1' },
  ];
  constructor() { }

  ngOnInit() {}

}
