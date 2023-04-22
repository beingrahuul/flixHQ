//Trending
import trendingTv from "./routes/trending/tv.js"
import trendingMovies from "./routes/trending/movies.js"

//Info
import movie_info from "./routes/info/movieInfo.js";
import tv_info from "./routes/info/tvInfo.js";
import search from "./routes/search/index.js";
import watch from "./routes/watch/watch.js";



const data = await trendingTv();
const data2 = await tv_info(data[1]);

console.log(data2);
