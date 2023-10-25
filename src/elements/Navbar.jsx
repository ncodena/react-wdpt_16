import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthenticated = sessionStorage.getItem('jwt');


  const logout = () => {
    sessionStorage.removeItem('jwt')
    navigate("/sign-in");
  }

  return (
    <div>
        <nav>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '2em'}}>
                {isAuthenticated ? (
                  <>
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