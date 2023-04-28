import express from "express";
import cors from 'cors'

//routes
import search from "./routes/search/searchRoute.js"
import info from "./routes/info/infoRoute.js"
import watch from "./routes/watch/watchRoute.js"

//Server
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())

app.use('/search', search);
app.use('/info', info);
app.use('/watch', watch);


app.get('/', (req, res) => {
  res.status(200).send("Beingrahuul")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


