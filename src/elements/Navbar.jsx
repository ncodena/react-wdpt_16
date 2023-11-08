import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {
  const {user, token, logout} = useContext(UserContext);

  console.log(user, 'user', token, 'token')


  return (
    <div>
        <nav>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '2em'}}>
                {token ? (
                  <>
                  <div>Welcome <strong>{user ? user.name : null}</strong></div>
                   <NavLink to="/">Films</NavLink>
                    <button onClick={logout}>Logout</button>
                  </>
                ) : <>
                    <NavLink to="/sign-in">Sign in</NavLink>
                    <NavLink to="/sign-up">Sign up</NavLink>
                  </>
                }
         </div>
        </nav>
    </div>
    
  )
}

export default Navbar