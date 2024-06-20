import { BehaviorSubject } from 'rxjs';

export interface PostEntityModel {
  save: Function;
  loading$: BehaviorSubject<boolean>;
}
