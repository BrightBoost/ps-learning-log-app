import { v4 as uuidv4 } from "uuid";
import { Entry } from "../models/entry";
import seedData from "../data/seed.json";

let entries: Entry[] = seedData.map((item) => ({
  ...item,
  date: new Date(item.date),
}));

export function createEntry(data: Omit<Entry, "id">): Entry {
  const entry: Entry = {
    id: uuidv4(),
    ...data,
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

// For testing: reset the in-memory store
export function resetEntries(): void {
  entries = [];
}
