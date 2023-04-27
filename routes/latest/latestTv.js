import cheerio from "cheerio";
import axios from "axios";

// Latest
const latestTv = async () => {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://flixhq.to/home",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const html = axiosResponse.data
  const $ = cheerio.load(html)
  const latest = []
  
  $('.film_list  > .film_list-wrap')[3].children.forEach((ele) => {
    if(ele.attribs != undefined && ele.attribs.class != 'clearfix'){
      const poster = ele.children[1].children[3].attribs["data-src"]
      const title = ele.children[3].children[1].children[0].children[0].data
      const season = ele.children[3].children[3].children[1].children[0].data
      const episode = ele.children[3].children[3].children[5].children[0].data
      const type = ele.children[3].children[3].children[7].children[0].data
      const id = ele.children[3].children[1].children[0].attribs.href.slice(7)
      const tempData = {
        title,
        poster,
        season,
        episode,
        type,
        id
      }
      latest.push(tempData)
    }
  })
  return latest
};

export default latestTv;
