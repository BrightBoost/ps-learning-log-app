import { Router, Request, Response } from "express";
import {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  addAhaMoment,
  getAhaMoments,
} from "../services/entryService";

const router = Router();

// POST /entries
router.post("/", (req: Request, res: Response) => {
  try {
    const { title, topic, date, notes, confidenceRating } = req.body;

    if (!title || !topic) {
      res.status(400).json({ error: "title and topic are required" });
      return;
    }

    const entry = createEntry({
      title,
      topic,
      date: date ? new Date(date) : new Date(),
      notes,
      confidenceRating,
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
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

// POST /entries/:id/aha-moments
router.post("/:id/aha-moments", (req: Request, res: Response) => {
  const { moment } = req.body;

  if (!moment || typeof moment !== "string") {
    res.status(400).json({ error: "moment is required" });
    return;
  }

  const ahaMoments = addAhaMoment(req.params.id, moment);

  if (!ahaMoments) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.status(201).json(ahaMoments);
});

// GET /entries/:id/aha-moments
router.get("/:id/aha-moments", (req: Request, res: Response) => {
  const ahaMoments = getAhaMoments(req.params.id);

  if (!ahaMoments) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(ahaMoments);
});

// PUT /entries/:id
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { title, topic, date, notes, confidenceRating } = req.body;

    const updated = updateEntry(req.params.id, {
      ...(title && { title }),
      ...(topic && { topic }),
      ...(date && { date: new Date(date) }),
      ...(notes !== undefined && { notes }),
      ...(confidenceRating !== undefined && { confidenceRating }),
    });

    if (!updated) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
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
