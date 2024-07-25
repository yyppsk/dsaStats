const fs = require("fs");
const path = require("path");

// Function to recursively get the directory structure
function getDirectoryStructure(dirPath) {
  const result = {};

  // Read the items in the directory
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    if (item === "node_modules" || item == ".git") {
      // Skip node_modules directory
      return;
    }

    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      result[item] = getDirectoryStructure(fullPath); // Recurse into the directory
    } else {
      result[item] = ""; // Represent files with empty strings
    }
  });

  return result;
}

// Define the directory you want to scan
const baseDir = path.join(__dirname); // Change this to the directory you want to scan

// Get the structure
const structure = getDirectoryStructure(baseDir);

// Print the structure as JSON
console.log(JSON.stringify(structure, null, 2));
