const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");
const svgTemplate = require("../svgTemplate"); // Adjust path if needed

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend"))); // Adjust path if needed

app.get("/api/codolio/:username", async (req, res) => {
  console.log(req.originalUrl);
  const username = req.params.username;

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html")); // Adjust path if needed
});

module.exports.handler = serverless(app);
