import cheerio from "cheerio";
import axios from "axios";

const get_episodes = async (id) => {

    const url = `https://flixhq.to/ajax/v2/season/episodes/${id}`;

    const axiosResponse = await axios.request({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
    });

    const html = axiosResponse.data
    const $ = cheerio.load(html);
    const episodes = []

    $('.nav')[0].children.forEach(ele => {
        if(ele.attribs != undefined){
            const data = {
                'id': ele.children[1].attribs.id.split('-').pop(),
                "title": ele.children[1].attribs.title
            }
            episodes.push(data);
        }
    })

    return episodes

}  

const get_seasons = async (watch_id) => {
    const id =  watch_id.split('-').pop();
    const url = `https://flixhq.to//ajax/v2/tv/seasons/${id}`;

    const axiosResponse = await axios.request({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
    });

    const html = axiosResponse.data
    const $ = cheerio.load(html);
    const seasons = []
    const element = $('.slce-list > .tab-content')[0].children
    for (const ele of element) {
        if(ele.attribs != undefined){
            const id = ele.attribs.id.split('-').pop()
            const episodes = await get_episodes(id)
            seasons.push({
                id, 
                episodes
            })
        }
    }

    return seasons;
}

const tv_info = async (type, id) => {
    const url = `https://flixhq.to/${type}/${id}`;
    const axiosResponse = await axios.request({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
    });

    const html = axiosResponse.data
    const $ = cheerio.load(html)
    const info = $('.movie_information > .container > .m_i-detail')
    
    const poster = info[0].children[1].children[1].children[1].attribs.src;
    const title = info[0].children[3].children[3].children[0].children[0].data;
    const quality = info[0].children[3].children[5].children[1].children[0].children[0].data;
    const rating = info[0].children[3].children[5].children[3].children[1].data;
    const duration = info[0].children[3].children[5].children[5].children[0].data;
    const description = info[0].children[3].children[7].children[0].data.trim();
    const country = info[0].children[3].children[9].children[1].children[3].children[0].data;
    const genres = [];
    info[0].children[3].children[9].children[3].children.forEach(element => {
        if (element.type === 'tag' && element.name === 'a') {
            genres.push(element.children[0].data);
        }
    });

    const releaseDate = info[0].children[3].children[9].children[5].children[2].data.trim();

    const production = [];
    info[0].children[3].children[9].children[7].children.forEach(element => {
        if (element.type === 'tag' && element.name === 'a') {
            production.push(element.children[0].data);
        }
    });

    const casts = [];
    info[0].children[3].children[9].children[9].children.forEach(element => {
        if (element.type === 'tag' && element.name === 'a') {
            casts.push(element.children[0].data);
        }
    });

    const episode_ids = [];
    const seasons = await get_seasons(id)
    const tempData = {
        poster,
        title,
        quality,
        rating,
        duration,
        description,
        releaseDate,
        country,
        genres,
        production,
        casts,
        seasons
    }
    
    return tempData;
}



export default tv_info;

