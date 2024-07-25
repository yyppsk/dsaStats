// server.js
const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;
const path = require("path");
const svgTemplate = require("./svgTemplate");

app.use(express.static(path.join(__dirname, "./frontend")));

app.get("/api/codolio/:username", async (req, res) => {
  console.log(req.originalUrl);
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch();
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
    // res.set("Cache-Control", "no-cache"); // Disable caching
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(404).send("User not found or error fetching data");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
