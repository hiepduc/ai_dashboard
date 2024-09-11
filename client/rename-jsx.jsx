const glob = require('glob');
const fs = require('fs');
const path = require('path');

// Synchronous version using glob.sync
const files = glob.sync("**/*.js", { ignore: "node_modules/**" });

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Check if the file contains JSX syntax
  if (content.match(/<[^>]+>/)) {
    const newFileName = file.replace(/\.js$/, '.jsx');
    fs.renameSync(file, newFileName);
    console.log(`Renamed: ${file} -> ${newFileName}`);
  }
});
