import cheerio from "cheerio";
import axios from "axios";

// TRENDING
const trendingMovies = async () => {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://flixhq.to/home",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const html = axiosResponse.data
  const $ = cheerio.load(html)
  const trending = $('#trending-movies > .film_list  > .film_list-wrap > .flw-item')
  const length = trending.length
  const filmData = [];

  for(let i = 0; i < length; i++){
    const poster = trending[i].children[1].children[3].attribs["data-src"]
    const name = trending[i].children[3].children[1].children[0].children[0].data
    const releaseDate = trending[i].children[3].children[3].children[1].children[0].data
    const duration = trending[i].children[3].children[3].children[5].children[0].data
    const type = trending[i].children[3].children[3].children[7].children[0].data
    const id = trending[i].children[3].children[1].children[0].attribs.href.slice(7)
    
    const tempData = {
      "title": name,
      "poster": poster,
      "releaseDate": releaseDate,
      "duration": duration,
      "type": type,
      id
    }
    filmData.push(tempData);
  }
  
  return filmData
};

export default trendingMovies;
