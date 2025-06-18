declare interface NavLink {
  name: string;
  path?: string;
  content?: {
    title: string;
    path: string;
  }[];
}
