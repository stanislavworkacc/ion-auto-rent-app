import { BehaviorSubject } from 'rxjs';

export interface DeleteEntityModel {
  delete: Function;
  loading$: BehaviorSubject<boolean>;
}
