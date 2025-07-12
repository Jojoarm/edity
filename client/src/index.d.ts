declare interface NavLink {
  name: string;
  path?: string;
  content?: {
    title: string;
    path: string;
  }[];
}

declare interface TrendResult {
  trend: 'increment' | 'decrement' | 'no change';
  percentage: number;
}
