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
      "all-parks": 'Колекції',
      "all-cars": 'Автопарк',
      "in-rent": 'В оренді',
    };

    return labelMappings[value.toLowerCase()] || value;
  }
}
