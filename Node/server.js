import express from "express";
import cors from "cors";
import db from "./app/config/config.js";
import routes from "./app/src/routes/routes.js";

const PORT = 1234;

const app = express();
app.use(cors());
app.use(express.json());
//app.use(cors({origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

try {
  await db.authenticate();
  console.log("Database connection has been established successfully");
} catch (error) {
  console.error("Unable to connect to the database: ", error);
}

db.sync();
//db.sync({ alter: true });
