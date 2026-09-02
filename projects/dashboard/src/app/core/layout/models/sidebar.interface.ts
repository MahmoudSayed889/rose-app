export interface AppSidebarItem {
  id: string;
  /** i18n key, resolved via the `translate` pipe — not display text. */
  label: string;
  icon: string;
  routerLink: string | string[];
}
