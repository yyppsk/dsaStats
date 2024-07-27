const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const commonRoutes = require("./routes/routes");
const codolioRouter = require("./routes/codolio");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./frontend")));

app.use("/", commonRoutes);
app.use("/api", codolioRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
