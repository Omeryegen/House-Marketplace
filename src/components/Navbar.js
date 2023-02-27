
import { Link } from 'react-router-dom'

const Navbar = () => {
    

  return (
    <div className='navbar'>
      <Link to="/"><i className="fa-solid fa-house-chimney fa-2xl"></i></Link>
      <Link to="/profile"><i className="fa-solid fa-user fa-2xl"></i></Link>
    </div>
  )
}

export default Navbar