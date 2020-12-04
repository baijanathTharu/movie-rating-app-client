import { Link } from 'react-router-dom';

const navLinks = [
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/services',
    name: 'Services',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];

export const Header = () => {
  const navList = navLinks.map(({ path, name }, idx) => {
    return (
      <li className='nav-item' key={idx}>
        <Link className='nav-link active' aria-current='page' to={path}>
          {name}
        </Link>
      </li>
    );
  });

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <h1 className='w-50 text-white mr-auto' style={{ fontSize: '20px' }}>
            Movie Rating App
          </h1>
          <ul className='navbar-nav mb-2 mb-lg-0'>{navList}</ul>
        </div>
      </div>
    </nav>
  );
};
