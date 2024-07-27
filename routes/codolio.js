const express = require("express");
const puppeteer = require("puppeteer");
const svgTemplate = require("../svgTemplate");
const fs = require("fs");
const path = require("path");
const requestIp = require("request-ip"); // Add this line
const router = express.Router();

router.get("/codolio/:username", async (req, res) => {
  const logFilePath = path.join(__dirname, "../logs.json");
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, JSON.stringify([]));
  }
  const currentDateTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const clientIp = requestIp.getClientIp(req); // Get the client's IP address

  const logEntry = {
    path: req.originalUrl,
    time: currentDateTime,
    ip: clientIp, // Use clientIp here
    username: req.params.username,
  };

  // Append log to the logs.json file
  fs.readFile(logFilePath, (err, data) => {
    if (err) throw err;
    const logs = JSON.parse(data);
    logs.push(logEntry);
    fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
      if (err) throw err;
    });
  });

  console.log(
    `[${currentDateTime}] Requested URL: ${req.originalUrl} from IP: ${clientIp}`
  );

  const username = req.params.username;

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://codolio.com/profile/${username}`, {
      waitUntil: "networkidle2",
    });

    let totalQuestions = 0;
    let totalContests = 0;
    let awards = 0;

    try {
      await page.waitForSelector("#total_questions", { timeout: 5000 });
      const totalQuestionsText = await page.$eval(
        "#total_questions",
        (el) => el.textContent
      );
      totalQuestions = parseInt(
        totalQuestionsText.match(/\d+/)?.[0] || "0",
        10
      );
    } catch (e) {
      console.log("Element '#total_questions' not found.");
    }

    try {
      await page.waitForSelector("#contest_description span", {
        timeout: 5000,
      });
      const totalContestsText = await page.$eval(
        "#contest_description span",
        (el) => el.textContent
      );
      totalContests = parseInt(totalContestsText.match(/\d+/)?.[0] || "0", 10);
    } catch (e) {
      console.log("Element '#contest_description span' not found.");
    }

    try {
      await page.waitForSelector("#badges div span", { timeout: 5000 });
      const awardsText = await page.$eval(
        "#badges div span",
        (el) => el.textContent
      );
      awards = parseInt(awardsText.match(/\d+/)?.[0] || "0", 10);
    } catch (e) {
      console.log("Element '#badges div span' not found.");
    }

    await browser.close();

    const svg = svgTemplate(username, totalQuestions, totalContests, awards);

    res.set("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(404).send("User not found or error fetching data");
  }
});

router.get("/checklogs", (req, res) => {
  const logFilePath = path.join(__dirname, "../logs.json");
  fs.readFile(logFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading log file");
    }
    const logs = JSON.parse(data);
    res.status(200).json(logs);
  });
});

module.exports = router;
