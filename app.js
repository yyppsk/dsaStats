const express = require("express");
const puppeteer = require("puppeteer"); // Use puppeteer
const app = express();
const cors = require("cors");
const path = require("path");
const svgTemplate = require("./svgTemplate");

app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./frontend")));

app.get("/api/codolio/:username", async (req, res) => {
  const currentDateTime = new Date().toLocaleString();
  console.log(`[${currentDateTime}] Requested URL: ${req.originalUrl}`);
  console.log(req.originalUrl);
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://codolio.com/profile/${username}`, {
      waitUntil: "networkidle2",
    });

    const totalQuestionsText = await page.$eval(
      "#total_questions",
      (el) => el.textContent
    );

    const totalQuestions = parseInt(totalQuestionsText.match(/\d+/)[0], 10);

    const totalContests = await page.$eval(
      "#contest_description span",
      (el) => el.textContent
    );
    const awards = await page.$eval("#badges div span", (el) => el.textContent);

    await browser.close();

    const svg = svgTemplate(username, totalQuestions, totalContests, awards);

    res.set("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(404).send("User not found or error fetching data");
  }
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/contact.html"));
});

app.get("/usage", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/usage.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});