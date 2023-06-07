import { Guid } from 'guid-typescript';

export interface IWorkItem {
  WorkItemId: number;
  SprintUID: Guid;
  ItemType: string;
  Title: string;
  Description: string;
  Severity: number;
  Priority: number;
  CreatedOn: Date;
  Points: number;
  Tags: string;
  AssignedTo: number;
  ResolvedBy: number;
  Status: number;
}

export interface IWorkItemsByStatus {
  sprintUID?: string;
  sprintNumber?: string;
  sprintName?: string;
  sprintEndDate: Date;
  planned: number;
  completed: number;
  incomplete: number;
}

export interface IWorkItemTask {
  TaskId: number;
  WorkItemId: number;
  TaskName: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  DurationInHrs: number;
  Status: string;
  Tags: string;
  AddDate: Date;
  ModDate: Date;
}

export interface IStatusCount {
  new: number;
  active: number;
  prReview: number;
  resolved: number;
  deliveredToQA: number;
  closed: number;
  removed: number;
}

export interface IWorkItems {
  WorkItemId: number;
  SprintUID: Guid;
  ItemType: string;
  Title: string;
  Description: string;
  Severity: number;
  Priority: number;
  CreatedOn: Date;
  Points: number;
  Tags: string;
  AssignedTo: number;
  ResolvedBy: number;
  Status: number;
}

export interface IWorkItemTask {
  TaskId: number;
  WorkItemId: number;
  TaskName: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  DurationInHrs: number;
  Status: string;
  Tags: string;
  AddDate: Date;
  ModDate: Date;
}
