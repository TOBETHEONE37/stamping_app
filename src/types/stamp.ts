export interface User {
  id: number;
  name: string;
  lastVisit: string;
  stampCount: number;
  canIssue: boolean;
}

export interface StampIssueHistory {
  name: string;
  time: string;
  count: number;
}