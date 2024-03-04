import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/drumkit">DRUMKIT</Link>
      &nbsp; | &nbsp;
      <Link to="/library">SOUND LIBRARY</Link>
      &nbsp; | &nbsp;
      <Link to="/layouts">LAYOUTS</Link>
      &nbsp; | &nbsp;
      <Link to="/upload">UPLOAD AUDIO</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}