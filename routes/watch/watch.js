import cheerio from "cheerio";
import axios from "axios";

const watch = async (data) => {
  const url = `https://flixhq.to/${data.type}/${data.id}`;

  const axiosResponse = await axios.request({
    method: "GET",
    url: url,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const html = axiosResponse.data
  const $ = cheerio.load(html)
  const searchResult = $('.film_list  > .film_list-wrap > .flw-item')
  const pageList = $('.pre-pagination  > nav > .pagination');
  const length = searchResult.length
  const results = [];

	//console.log(html)
};

export default watch;
