require("dotenv").config();
const app = require("./src/app");
const { PORT } = process.env;
const cors = require("cors");

app.use(
  cors({
    origin: "https://aroma-cafe-cliente.onrender.com",
  })
);

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
