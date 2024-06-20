import {of} from "rxjs/internal/observable/of";

//@ts-ignore
export function handleError(errors, _toastService) {
  if (errors && errors.data) {
    const message = errors.data.length ? errors.data.map((err: { message: any; }) => `${err.message}`).join('\n') : errors.data.message;
    _toastService.show({
      type: 'error',
      message
    });

    return of(message);
  }

  return of(false);
}
