import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {GetEntityModel} from "../../../../../libs/collection/src/lib/models/get-entity.model";
import {CrudService} from "../../../../../libs/collection/src/lib/crud.service";
import {domainName} from "../../../../environments/environment";
import {LoadingService} from "../../services/loading.service";
import {AutoRIAService} from "../../services/autoRIA.service";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostModalComponent  implements OnInit {

  private autoRIAService: AutoRIAService = inject(AutoRIAService)

  async loadAutoModels(): Promise<void> {
    const categories = await this.autoRIAService.getAutoModels('categories');

    debugger
  }
  ngOnInit() {}

  constructor() {

  }
}
