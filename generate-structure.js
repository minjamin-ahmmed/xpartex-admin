import { writeFileSync } from "fs";
import dirTree from "directory-tree";

// Generate directory tree, excluding .next and node_modules
const tree = dirTree(".", {
  exclude: /node_modules|\.next/,
});

// Save as JSON
writeFileSync("structure.json", JSON.stringify(tree, null, 2));
console.log("✅ Folder structure saved to structure.json");
