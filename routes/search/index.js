import cheerio from "cheerio";
import axios from "axios";


// TRENDING
const search = async (query, page) => {
  const axiosResponse = await axios.request({
    method: "GET",
    url: `https://flixhq.to/search/${query}?page=${page}`,
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

  for(let i = 0; i < length; i++){
    const poster = searchResult[i].children[1].children[3].attribs["data-src"]
    const name = searchResult[i].children[3].children[1].children[0].children[0].data
    const releaseDate = searchResult[i].children[3].children[3].children[1].children[0].data
    const season = searchResult[i].children[3].children[3].children[1].children[0].data
    const duration = searchResult[i].children[3].children[3].children[5].children[0].data
    const total_eps = searchResult[i].children[3].children[3].children[5].children[0].data
    const type = searchResult[i].children[3].children[3].children[7].children[0].data
    const id = searchResult[i].children[3].children[1].children[0].attribs.href.slice(7)
    
    const tempData = {
      name,
      poster,
     	type,
      id
    }

		if(type === "TV") {
			tempData.season = season;
			tempData.total_eps = total_eps;
		}

		if(type === "Movie") {
			tempData.releaseDate = releaseDate;
			tempData.duration = duration;
		}
		results.push(tempData)
  }

  const hasNextpage = () => {
		let next = false;
		pageList[0].children.forEach(ele => {
		if(ele.children[0].attribs.title === "Next"){
			next = true;
		}
		})
		return next
	}
	hasNextpage();

	const searchData = {
		"hasNextPage": hasNextpage(),
		results
	}
	console.log(searchData);
};



export default search;