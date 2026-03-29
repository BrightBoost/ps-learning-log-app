export interface Entry {
  id: string;
  title: string;
  topic: string;
  date: Date;
  notes?: string;
  confidenceRating?: number | null;
}
