export interface IEmployeeStatus {
  empName: string;
  empEmail: string;
  new: number;
  active: number;
  prReview: number;
  resolved: number;
  deliveredToQA: number;
  closed: number;
  removed: number;
  total: number;
}

export interface IEmployeeStatusWithWorkItemDetails {
  empName: string;
  empEmail: string;
  new: number;
  active: number;
  prReview: number;
  resolved: number;
  deliveredToQA: number;
  closed: number;
  removed: number;
  total: number;
  workItemDetails: IEmployeeWorkItemDetails[];
  expanded: boolean;
  totalPoints: number;
}

export interface IEmployeeWorkItemDetails {
  WorkItemId: number;
  Title: string;
  Points: number;
  Status: string;
}

export interface IEmployeePoints {
  EmpName: string;
  Points: number;
}

export interface IEmployeeBugsCount {
  EmpName: string;
  BugCount: number;
}

export interface IEmployeeStatusNew {
  EmpName: string;
  EmpEmail: string;
  New: number;
  Active: number;
  PRReview: number;
  Resolved: number;
  DeliveredToQA: number;
  Closed: number;
  Removed: number;
  Other: number;
  Total: number;
}
