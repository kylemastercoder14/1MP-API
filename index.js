const express = require("express");

const app = express();
app.use(express.json());

app.use("/api/v1/categories", require("./routes/categories-route"));
app.use("/api/v1/sub-categories", require("./routes/subcategories-route"));
app.get("/", (req, res) => {
  res.send("Developed by: ~kylemastercoder~");
});

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});
