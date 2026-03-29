import { v4 as uuidv4 } from "uuid";
import { AhaMoment, Entry } from "../models/entry";
import seedData from "../data/seed.json";

let entries: Entry[] = seedData.map((item) => ({
  ...item,
  date: new Date(item.date),
  ahaMoments: [],
}));

export function createEntry(
  data: Omit<Entry, "id" | "ahaMoments"> & { ahaMoments?: AhaMoment[] },
): Entry {
  if (
    data.confidenceRating !== undefined &&
    data.confidenceRating !== null &&
    (data.confidenceRating < 1 || data.confidenceRating > 5)
  ) {
    throw new Error("Confidence rating must be between 1 and 5.");
  }
  const entry: Entry = {
    id: uuidv4(),
    ...data,
    ahaMoments: data.ahaMoments ?? [],
  };
  entries.push(entry);
  return entry;
}

export function getEntries(): Entry[] {
  return entries;
}

export function getEntryById(id: string): Entry | undefined {
  return entries.find((entry) => entry.id === id);
}

export function updateEntry(
  id: string,
  data: Partial<Omit<Entry, "id">>,
): Entry | undefined {
  if (
    data.confidenceRating !== undefined &&
    data.confidenceRating !== null &&
    (data.confidenceRating < 1 || data.confidenceRating > 5)
  ) {
    throw new Error("Confidence rating must be between 1 and 5.");
  }
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return undefined;

  entries[index] = { ...entries[index], ...data };
  return entries[index];
}

export function deleteEntry(id: string): boolean {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return false;

  entries.splice(index, 1);
  return true;
}

export function addAhaMoment(
  entryId: string,
  moment: string,
): AhaMoment[] | undefined {
  const entry = entries.find((item) => item.id === entryId);

  if (!entry) return undefined;

  const ahaMoment: AhaMoment = {
    moment,
    timestamp: new Date(),
  };

  entry.ahaMoments.push(ahaMoment);
  return entry.ahaMoments;
}

export function getAhaMoments(entryId: string): AhaMoment[] | undefined {
  const entry = entries.find((item) => item.id === entryId);
  if (!entry) return undefined;

  return entry.ahaMoments;
}

// For testing: reset the in-memory store
export function resetEntries(): void {
  entries = [];
}
