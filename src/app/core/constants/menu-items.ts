export interface MenuItem {
  fragment: string;
  labelKey: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { fragment: 'activity', labelKey: 'aboutUs' },
  { fragment: 'Approach', labelKey: 'Approach' },
  { fragment: 'technologies', labelKey: 'technologies' },
  { fragment: 'trust', labelKey: 'trust' },
  { fragment: 'contact-us', labelKey: 'contactUs' }
];
