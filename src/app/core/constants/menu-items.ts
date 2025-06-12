export interface MenuItem {
  fragment: string;
  labelKey: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { fragment: 'activity', labelKey: 'aboutUs' },
  { fragment: 'Approach', labelKey: 'Approach' },
  { fragment: 'technologies', labelKey: 'technologies' },
  { fragment: 'contact-us', labelKey: 'contactUs' }
];
