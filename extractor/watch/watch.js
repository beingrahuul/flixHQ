import cheerio from "cheerio";
import axios from "axios";
import cryptoJs from 'crypto-js'
import key from "../../key.js";
const getServers = async (id, type) => {
  const url = (type === "Movie") ? `https://flixhq.to/ajax/movie/episodes/${id}` : `https://flixhq.to/ajax/v2/episode/servers/${id}`
  const axiosResponse = await axios.request({
    method: "GET",
    url: url,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const html = axiosResponse.data
  const $ = cheerio.load(html)
  const servers = []
  $('.nav')[0].children.forEach((ele) => {
    if (ele.attribs != undefined) {
      const tempData = {
        'id': (type === "Movie") ? ele.children[1].attribs['data-linkid'] : ele.children[1].attribs['data-id'],
        title: ele.children[1].attribs['title'].split(" ").pop()
      }
      servers.push(tempData);
    }
  })

  return servers
}

const getSources = async (id) => {
  const url = `https://flixhq.to/ajax/sources/${id}`
  const axiosResponse = await axios.request({
    method: "GET",
    url: url,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  return axiosResponse.data['link'];
}

const getStreamingLinks = async (server) => {
  const url = `${server.host}/ajax/embed-4/getSources?id=${server.id}`
  const options = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': server.href,
    },
  };
  const { data } = await axios.get(url, options);

  const sources = JSON.parse(cryptoJs.AES.decrypt(data.sources, key).toString(cryptoJs.enc.Utf8));                
  const subtitles = data.tracks
  const result = []

  for (const source of sources) {
    const { data } = await axios.get(source.file, options);
    const videoUrls = data.split('\n').filter((line) => line.includes('.m3u8'));
    const videoQualities = data.split('\n').filter((line) => line.includes('RESOLUTION='));

    videoQualities.map((item, i) => {
        const quality = item.split(',')[2].split('x')[1];
        const url = videoUrls[i];

        result.push({
            url: url,
            quality: quality,
            isM3U8: url.includes('.m3u8'),
        });
    });
  }

  const videoResult = {
    result,
    subtitles
  }

  return videoResult;
}

const watch = async (id, type, serverName) => {
  const servers = await getServers(id, type)
  const streamData = []
  for (const server of servers) {
    if(server.title === serverName){
      const link = await getSources(server.id);
      streamData.push({
        "id": link.split('/').pop().split('?z')[0],
        "host": `https://${link.split('/')[2]}`,
        "server": server.title,
        "href": link
      })
    }
  }
  
  const result = await getStreamingLinks(streamData[0])
  console.log(result);
  //return result;
};


export default watch;
