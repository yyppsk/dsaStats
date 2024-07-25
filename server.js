const express = require("express");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const app = express();
const path = require("path");
const svgTemplate = require("./svgTemplate");

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./frontend")));

app.get("/api/codolio/:username", async (req, res) => {
  console.log(req.originalUrl);
  const username = req.params.username;

  let driver;
  try {
    // Setup Chrome options
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--headless"); // Run in headless mode

    // Initialize the Selenium WebDriver
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    // Navigate to the user's profile
    await driver.get(`https://codolio.com/profile/${username}`);

    // Extract data from the page
    const totalQuestionsText = await driver
      .findElement(By.css("#total_questions"))
      .getText();
    const totalQuestions = parseInt(totalQuestionsText.match(/\d+/)[0], 10);

    const totalContests = await driver
      .findElement(By.css("#contest_description span"))
      .getText();
    const awards = await driver
      .findElement(By.css("#badges div span"))
      .getText();

    // Generate SVG
    const svg = svgTemplate(username, totalQuestions, totalContests, awards);

    res.set("Content-Type", "image/svg+xml");
    // res.set("Cache-Control", "no-cache"); // Disable caching
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(404).send("User not found or error fetching data");
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
