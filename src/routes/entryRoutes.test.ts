import request from "supertest";
import express from "express";
import entryRoutes from "./entryRoutes";
import { resetEntries, createEntry } from "../services/entryService";

const app = express();
app.use(express.json());
app.use("/entries", entryRoutes);

describe("Entry Routes", () => {
  beforeEach(() => {
    resetEntries();
  });

  describe("POST /entries", () => {
    it("should create an entry with a valid confidence rating", async () => {
      const entryData = {
        title: "Test Title",
        topic: "Test Topic",
        notes: "Test notes",
        confidenceRating: 4,
      };
      const response = await request(app).post("/entries").send(entryData);
      expect(response.status).toBe(201);
      expect(response.body.confidenceRating).toBe(4);
    });

    it("should create an entry without a confidence rating", async () => {
      const entryData = {
        title: "Test Title",
        topic: "Test Topic",
        notes: "Test notes",
      };
      const response = await request(app).post("/entries").send(entryData);
      expect(response.status).toBe(201);
      expect(response.body.confidenceRating).toBeUndefined();
    });

    it("should return a 400 error for an invalid confidence rating", async () => {
      const entryData = {
        title: "Test Title",
        topic: "Test Topic",
        notes: "Test notes",
        confidenceRating: 6,
      };
      const response = await request(app).post("/entries").send(entryData);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Confidence rating must be between 1 and 5."
      );
    });
  });

  describe("PUT /entries/:id", () => {
    let testEntry: any;

    beforeEach(async () => {
      testEntry = createEntry({
        title: "Initial Title",
        topic: "Initial Topic",
        date: new Date(),
        notes: "Initial notes",
        confidenceRating: 2,
      });
    });

    it("should update an entry with a valid confidence rating", async () => {
      const updatedData = { confidenceRating: 5 };
      const response = await request(app)
        .put(`/entries/${testEntry.id}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.confidenceRating).toBe(5);
    });

    it("should return a 400 error when updating with an invalid confidence rating", async () => {
      const updatedData = { confidenceRating: 0 };
      const response = await request(app)
        .put(`/entries/${testEntry.id}`)
        .send(updatedData);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Confidence rating must be between 1 and 5."
      );
    });
  });
});
