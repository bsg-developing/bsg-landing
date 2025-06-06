export interface MenuItem {
  fragment: string;
  labelKey: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { fragment: 'activity', labelKey: 'aboutUs' },
  { fragment: 'features', labelKey: 'careers' },
  { fragment: 'technologies', labelKey: 'technologies' },
  { fragment: 'projects', labelKey: 'products' },
  { fragment: 'footer', labelKey: 'contactUs' }
];
