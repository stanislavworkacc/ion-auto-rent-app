export interface TabConfig {
  route: string;
  icon: string;
  label: string;
}

export const tabConfig: TabConfig[] = [
  {
    route: 'dashboard',
    icon: 'apps-outline',
    label: 'Головна'
  },
  {
    route: 'locator',
    icon: 'compass-outline',
    label: 'Локатор'
  },
  {
    route: 'add',
    icon: 'add-circle-outline',
    label: 'Додати'
  },
  {
    route: 'chat',
    icon: 'chatbubbles-outline',
    label: 'Чат'
  },
  {
    route: 'menu',
    icon: 'person-circle-outline',
    label: 'Меню'
  }
];
