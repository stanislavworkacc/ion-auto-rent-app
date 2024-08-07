import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {RentCardService} from "../rent-card.service";

@Component({
  selector: 'side-info-tile',
  templateUrl: './side-info-tile.component.html',
  styleUrls: ['./side-info-tile.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideInfoTileComponent implements OnInit {

  @Input() rentCard: RentCardService;

  constructor() {
  }

  ngOnInit() {
  }

}
