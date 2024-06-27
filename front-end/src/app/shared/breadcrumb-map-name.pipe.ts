import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'breadcrumbLabel',
  standalone: true
})
export class BreadcrumbLabelPipe implements PipeTransform {
  transform(value: string): string {
    const labelMappings: { [key: string]: string } = {
      home: 'Головна',
      menu: 'Меню',
      profile: 'Профіль',
      edit: 'Редагування',
      "car-park": 'Автопарк',
    };

    return labelMappings[value.toLowerCase()] || value;
  }
}
