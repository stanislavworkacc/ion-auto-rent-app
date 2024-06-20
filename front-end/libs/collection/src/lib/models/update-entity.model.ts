import { BehaviorSubject } from 'rxjs';

export interface UpdateEntityModel {
  update: Function;
  loading$: BehaviorSubject<boolean>;
}
