import { Router, Request, Response } from "express";
import {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../services/entryService";

const router = Router();

// POST /entries
router.post("/", (req: Request, res: Response) => {
  const { title, topic, date, notes } = req.body;

  if (!title || !topic) {
    res.status(400).json({ error: "title and topic are required" });
    return;
  }

  const entry = createEntry({
    title,
    topic,
    date: date ? new Date(date) : new Date(),
    notes,
  });

  res.status(201).json(entry);
});

// GET /entries
router.get("/", (_req: Request, res: Response) => {
  const entries = getEntries();
  res.json(entries);
});

// GET /entries/:id
router.get("/:id", (req: Request, res: Response) => {
  const entry = getEntryById(req.params.id);

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(entry);
});

// PUT /entries/:id
router.put("/:id", (req: Request, res: Response) => {
  const { title, topic, date, notes } = req.body;

  const updated = updateEntry(req.params.id, {
    ...(title && { title }),
    ...(topic && { topic }),
    ...(date && { date: new Date(date) }),
    ...(notes !== undefined && { notes }),
  });

  if (!updated) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(updated);
});

// DELETE /entries/:id
router.delete("/:id", (req: Request, res: Response) => {
  const deleted = deleteEntry(req.params.id);

  if (!deleted) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.status(204).send();
});

export default router;
