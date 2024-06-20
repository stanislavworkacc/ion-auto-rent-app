import { BehaviorSubject } from 'rxjs';

export interface GetEntityModel {
  get: Function;
  loading$: BehaviorSubject<boolean>;
}
