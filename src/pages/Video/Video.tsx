import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {
  const {categoryId} = useParams();
  return (
    <div className='play-container'>
      <PlayVideo />
      <Recommended categoryId={categoryId??""} />
    </div>
  )
}

export default Video
