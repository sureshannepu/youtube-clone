import  { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter, API_BASE_URL } from '../../data'
import type { VideoApiResponse, ChannelApiResponse, CommentItem } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
    const {videoId} = useParams();

    const [apiData, setApiData] = useState<VideoApiResponse | null>(null);
    const [channelData, setChannelData] = useState<ChannelApiResponse | null>(null);
    const [commentData, setCommentData] = useState<CommentItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchVideoData=async()=>{
        try {
            const videoDetails_url=`${API_BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(videoDetails_url);
            if (!response.ok) throw new Error("Failed to fetch video details");
            const data = await response.json();
            setApiData(data.items[0]);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load video.");
        }
    }

    const fetchOtherData=async()=>{
        try {
            if (!apiData?.snippet.channelId) return;
            
            const  channelData_url=`${API_BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
            const channelResponse = await fetch(channelData_url);
            if (!channelResponse.ok) throw new Error("Failed to fetch channel details");
            const channelResult = await channelResponse.json();
            setChannelData(channelResult.items ? channelResult.items[0] : null);

            const comment_url=`${API_BASE_URL}/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
            const commentResponse = await fetch(comment_url);
            if (!commentResponse.ok) throw new Error("Failed to fetch comments");
            const commentResult = await commentResponse.json();
            setCommentData(commentResult.items || []);
        } catch (err) {
            console.error(err);
            // Don't block the UI if secondary data fails
        }
    }
    useEffect(()=>{
        fetchVideoData();
    },[videoId])

    useEffect(()=>{
        fetchOtherData();
    },[apiData])

  if (error) {
    return <div className="play-video-error">{error}</div>;
  }

  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"0"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
            <div>
                <span><img src={like} alt="" /> {apiData?value_converter(apiData.statistics.viewCount):"0"}</span>
                <span><img src={dislike} alt="" /> </span>
                <span><img src={share} alt="" /> Share</span>
                <span><img src={save} alt="" /> Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="Channel Logo" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"Channel Name"}</p>
                <span>{channelData?.statistics.subscriberCount ? value_converter(channelData.statistics.subscriberCount) : "0"} Subscribers</span>
            </div>
            <button type='button'>Subscribe</button>
        </div>
        <div className='vid-description'>
           <p>{apiData?apiData.snippet.description.slice(0, 250):"Description Here"}</p>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):"0"} Comments</h4>
            {commentData.map((item, index) => (
                <div className="comment" key={index}>
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)} likes</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlayVideo
