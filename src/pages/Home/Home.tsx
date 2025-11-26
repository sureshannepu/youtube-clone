import { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'

import { useSidebarStore } from '../../store/sidebarStore'

const Home = () => {
  const [category,setCategory] = useState(0) ;
  const { sidebar } = useSidebarStore();
  
  return (
    <div>
      <Sidebar category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <Feed category={category}/>
      </div>
    </div>
  )
}

export default Home
