const fs = require("fs").promises;
const path = require("path");
const { generateHtml } = require("./src/template");

async function build() {
  try {
    // Read stations.json
    const stationsPath = path.join(__dirname, "src", "stations.json");
    const stationsData = await fs.readFile(stationsPath, "utf8");
    const stations = JSON.parse(stationsData);

    // Generate HTML
    const htmlContent = generateHtml(stations);

    // Ensure dist directory exists
    const distPath = path.join(__dirname, "dist");
    await fs.mkdir(distPath, { recursive: true });

    // Write to dist/index.html
    const outputPath = path.join(distPath, "index.html");
    await fs.writeFile(outputPath, htmlContent);

    console.log("Build completed successfully! Generated: dist/index.html");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
