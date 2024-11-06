const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = 5300;

// SSL certificates using OpenSSL-generated .pem files
const options = {
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem")
};

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Define routes for auth-start and auth-end with logging
app.get("/auth-start.html", (req, res) => {
    console.log("auth-start.html was accessed by the Teams app.");
    res.sendFile(path.join(__dirname, "public", "auth-start.html"));
});

app.get("/auth-end.html", (req, res) => {
    console.log("auth-end.html was accessed by the Teams app.");
    res.sendFile(path.join(__dirname, "public", "auth-end.html"));
});

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
