import {marker} from "@biesbjerg/ngx-translate-extract-marker";

export interface TabConfig {
  route: string;
  icon: string;
  label: string;
}

export const tabConfig: TabConfig[] = [
  {
    route: 'dashboard',
    icon: 'apps-outline',
    label: marker('TAB.DASHBOARD')
  },
  {
    route: 'locator',
    icon: 'compass-outline',
    label: marker('TAB.LOCATOR')
  },
  {
    route: 'add',
    icon: 'add-circle-outline',
    label: marker('TAB.ADD')
  },
  {
    route: 'chat',
    icon: 'chatbubbles-outline',
    label: marker('TAB.CHAT')
  },
  {
    route: 'menu',
    icon: 'person-circle-outline',
    label: marker('TAB.MENU')
  }
];
