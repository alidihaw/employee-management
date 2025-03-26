module.exports = {
    // Your default settings (if any)
    printWidth: 80, // Example default printWidth
  
    // Overrides for specific file types
    overrides: [
      {
        files: ["*.html", "*.ts"], // Targeting HTML files
        options: {
          printWidth: 150, // Set your desired max line length for HTML
        },
      }
    ],
  };
  