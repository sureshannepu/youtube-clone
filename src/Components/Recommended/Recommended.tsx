import './Recommended.css'
import { useEffect, useState } from 'react'
import { API_KEY, value_converter, API_BASE_URL } from '../../data'
import type { VideoItem } from '../../data'
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}:{categoryId:string}) => {

  const [apiData, setApiData] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData=async()=>{
    try {
      const relatedVideos_url=`${API_BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&maxResults=50&key=${API_KEY}`
      const response = await fetch(relatedVideos_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.items) {
        setApiData(result.items);
        setError(null);
      } else {
        console.error("API response missing items:", result);
        setError("No recommended videos found.");
      }
    } catch (err: any) {
      console.error("Failed to fetch recommended videos:", err);
      setError("Failed to load recommended videos.");
    }
  }

  useEffect(()=>{
    fetchData();
  },[categoryId])

  if (error) {
    return <div className="recommended-error">{error}</div>;
  }

  return (
    <div className='recommended'>
      {apiData.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${typeof item.id === 'object' ? item.id.videoId : item.id}`} className="side-video-list" key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Recommended
