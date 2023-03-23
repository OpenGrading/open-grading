interface NavigationItem {
  route: string;
  url: string;
}

interface NavigationGroup {
  url: string;
  children: NavigationItem[];
}

export type Navigation = (NavigationItem | NavigationGroup)[];
