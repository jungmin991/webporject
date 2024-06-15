const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const hostname = "127.0.0.1";
const port = 3000;

const login = require("./routes/login");
const campGround = require("./routes/campGround");
const campSite = require("./routes/campSite");
const reservation = require("./routes/Reservation");
const review = require("./routes/review");

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors());

app.use(login);
app.use(campGround);
app.use(campSite);
app.use(reservation);
app.use(review);

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// 리액트 정적 파일 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build','index.html'));
})