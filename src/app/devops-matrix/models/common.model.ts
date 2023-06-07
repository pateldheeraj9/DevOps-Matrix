import { Guid } from 'guid-typescript';
export interface ISprintData {
  id: number;
  workItemType: string;
  title: string;
  assignedTo: string;
  state: string;
  tags: string;
  resolvedBy: string;
  completedWork: number;
  severity: string;
  createdDate: Date,
  strotyPoints: number;
}

export interface ISprint {
  sprintUID: string;
  sprintNumber: string;
  sprintName: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
}
export interface ISprintStatus {
  itemType: string;
  new: number;
  active: number;
  prReview: number;
  resolved: number;
  deliveredToQA: number;
  closed: number;
  removed: number;
  total: number;
}



export interface ITotalCount {
  TotalCount: number;
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

export interface ISeverityCount {
 
  SprintNumber: string;
 // Severity: string;
  Critical: string;
   High: string;
   Medium: string;
   Low: string; 
}
export interface IUserStoryCount {
 
  SprintNumber: string;
   High: string;
   Medium: string;
   Low: string; 
}
export interface ISeverityBugCount {
 
   sprintNumber: string;
   empName: string;
   empEmail: string;
   critical: string;
   high: string;
   medium: string;
   low: string; 
   total: number; 
}
