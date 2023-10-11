import express from "express";
import dotenv from "dotenv";
import { getConnection } from "./database/database.js";
import tableRoutes from './routes/table.js'
const app = express();
dotenv.config();

getConnection()
const port = process.env.PORT || 4000;

app.use('/api',tableRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
