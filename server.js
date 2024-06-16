const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const hostname = "127.0.0.1";
const port = 9009;

app.use(express.static('public'));
// Multer setup
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

// Ensure the 'public/uploads' directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
//app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors());

// Import routes
const login = require("./routes/login");
const campGround = require("./routes/campGround");
const campSite = require("./routes/campSite");
const reservation = require("./routes/Reservation");
const review = require("./routes/Review");

// Use routes
app.use(login);
app.use(campGround);
app.use(campSite);
app.use(reservation);
app.use(review);

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
});

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
