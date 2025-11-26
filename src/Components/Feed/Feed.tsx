import { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import {API_KEY,value_converter, API_BASE_URL} from '../../data'
import type { VideoItem } from '../../data'
import moment from "moment";

const Feed = ({ category }: { category: number}) => {

  const [data,setData] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const videoList_url=`${API_BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      const response = await fetch(videoList_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.items) {
        setData(result.items);
        setError(null);
      } else {
        console.error("API response missing items:", result);
        setError("No videos found.");
      }
    } catch (err: any) {
      console.error("Failed to fetch feed data:", err);
      setError("Failed to load videos. Please check your API key and network connection.");
    }
  }

  useEffect(()=>{
    fetchData();
  },[category])

  if (error) {
    return <div className="feed-error">{error}</div>;
  }

  return (
    <div className="feed">
      {data.map((item, index) => (
        <Link to={`video/${item.snippet.categoryId}/${typeof item.id === 'object' ? item.id.videoId : item.id}`} className="card" key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
