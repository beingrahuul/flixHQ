import cheerio from "cheerio";
import axios from "axios";

// Latest
const comingSoon = async () => {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://flixhq.to/home",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const html = axiosResponse.data
  const $ = cheerio.load(html)
  const coming_soon = []
  
  $('.film_list  > .film_list-wrap')[4].children.forEach((ele) => {
    if(ele.attribs != undefined && ele.attribs.class != 'clearfix'){
        const type = ele.children[3].children[3].children[3].children[0].data;
        const poster = ele.children[1].children[3].attribs["data-src"];
        const releaseDate = ele.children[3].children[3].children[1].children[0].data        
        const title = ele.children[3].children[1].children[0].children[0].data
        const id = (type === "Movie") ? ele.children[3].children[1].children[0].attribs.href.slice(7) : ele.children[3].children[1].children[0].attribs.href.slice(4)
        
        const tempData = {
          title,
          type,
          poster,
          releaseDate,
          id
        }

        coming_soon.push(tempData);
    }
  })
  return coming_soon;
};

export default comingSoon;
