import {marker} from "@biesbjerg/ngx-translate-extract-marker";

export interface TabConfig {
  route: string;
  icon: string;
  iconActive: string;
  label: string;
}

export const tabConfig: TabConfig[] = [
  {
    route: 'dashboard',
    icon: 'apps-outline',
    iconActive: 'apps',
    label: marker('TAB.DASHBOARD')
  },
  {
    route: 'locator',
    icon: 'compass-outline',
    iconActive: 'compass',
    label: marker('TAB.LOCATOR')
  },
  {
    route: 'add',
    icon: 'add-circle-outline',
    iconActive: 'add-circle',
    label: marker('TAB.ADD')
  },
  {
    route: 'chat',
    icon: 'chatbubbles-outline',
    iconActive: 'chatbubbles',
    label: marker('TAB.CHAT')
  },
  {
    route: 'menu',
    icon: 'person-circle-outline',
    iconActive: 'person-circle',
    label: marker('TAB.MENU')
  }
];
