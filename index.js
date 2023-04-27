import express from "express";
import cors from 'cors'

//Trending
import trendingTv from "./routes/trending/tv.js"
import trendingMovies from "./routes/trending/movies.js"

//Info
import movie_info from "./routes/info/movieInfo.js";
import tv_info from "./routes/info/tvInfo.js";
import search from "./routes/search/index.js";
import watch from "./routes/watch/watch.js";
import latestMovies from "./routes/latest/latestMovies.js";
import latestTv from "./routes/latest/latestTv.js";
import comingSoon from "./routes/coming/comingSoon.js";

//Server
const app = express();
const port = 8080;


const data = await comingSoon();
const index = 5;
const data2 = (data[index].type === 'Movie') ? await movie_info(data[index]) : await tv_info(data[index]);


app.get('/', (req, res) => {
  res.json({"result": data2})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


