import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  //Alternative to href in order to preserve layout of the NavBar
  const navigateHome = () => navigate('/'); 

  return (
    <nav>
      <img
        className="nav-logo"
        src="/logo512.png"
        alt="logo512"
        style={{width: '10%'}}
        onClick={navigateHome}
      />
      <Link to="/drumkit" className={location.pathname === '/drumkit' ? 'active-link' : 'inactive-link'}>DRUMKIT</Link>
      &nbsp; | &nbsp;
      <Link to="/library" className={location.pathname === '/library' ? 'active-link' : 'inactive-link'}>SOUND LIBRARY</Link>
      &nbsp; | &nbsp;
      <Link to="/layouts" className={location.pathname === '/layouts' ? 'active-link' : 'inactive-link'}>LAYOUTS</Link>
      &nbsp; | &nbsp;
      <Link to="/upload" className={location.pathname === '/upload' ? 'active-link' : 'inactive-link'}>UPLOAD AUDIO</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}
