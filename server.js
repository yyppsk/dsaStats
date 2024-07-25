const express = require("express");
const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");
const path = require("path");
const svgTemplate = require("./svgTemplate");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./frontend")));

app.get("/api/codolio/:username", async (req, res) => {
  const username = req.params.username;
  try {
    // Puppeteer launch options
    const options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      ignoreDefaultArgs: ["--disable-extensions"],
    };

    const browser = await puppeteer.launch(options);
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
    res.status(500).send("User not found or error fetching data");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
