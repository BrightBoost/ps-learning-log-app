import express from "express";
import entryRoutes from "./routes/entryRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/entries", entryRoutes);

app.listen(PORT, () => {
  console.log(`Learning Log API running on http://localhost:${PORT}`);
});

export default app;
