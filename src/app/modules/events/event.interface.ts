import { Document } from 'mongoose';

export interface Duration {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface TimeFor {
  hours?: number;
  minutes?: number;
  seconds?: number;
  short?: number;
  written?: number;
  mcq?: number;
}

export interface IEvent extends Document {
  event_name: string;
  total_question: number;
  duration: Duration;
  start_time: string; // ISO date string
  end_time: string; // ISO date string
  time_for: TimeFor;
  questions: any[];
}






