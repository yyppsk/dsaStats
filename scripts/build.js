const fs = require("fs");
const path = require("path");

// Function to copy files and directories recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Paths
const sourceDir = path.join(__dirname, "../frontend");
const targetDir = path.join(__dirname, "../dist");

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Copy contents of the frontend directory to the dist directory
copyRecursiveSync(sourceDir, targetDir);

console.log("All files copied from frontend to dist");
