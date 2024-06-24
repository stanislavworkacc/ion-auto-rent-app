import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs";

export function handleError(errors: any, _toastService: any): Observable<string> {

  let message: string = 'Сталася невідома помилка. Будь ласка, спробуйте ще раз пізніше.';

  if (errors.message) {
    message = errors.message;
  }

  _toastService.show({
    type: 'error',
    message: message
  });

  return of(message);
}
