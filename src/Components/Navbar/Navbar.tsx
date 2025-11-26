import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'

import { useSidebarStore } from '../../store/sidebarStore'

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img src={menu_icon} onClick={toggleSidebar} className="menu-icon" alt="" />
        <Link to="/"><img src={logo} className="logo" alt="" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={search_icon} className="search-icon" alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="upload" />
        <img src={more_icon} alt="more" />
        <img src={notification_icon} alt="notification" />
        <img src={profile_icon} alt="profile" className="user-icon" />
      </div>
    </nav>
  );
}

export default Navbar
