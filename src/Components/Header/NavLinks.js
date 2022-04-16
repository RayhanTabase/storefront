import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import Logo from '../../icons/planet.png';

const NavLink = () => {
  const [showHamburgerLinks, setShowHamburgerLinks] = useState(false);

  const showLinks = () => {
    setShowHamburgerLinks((prevState) => !prevState);
  };
  const links = [
    {
      id: 1,
      path: '/women',
      text: 'WOMEN',
    },
    {
      id: 2,
      path: '/men',
      text: 'MEN',
    },
    {
      id: 3,
      path: '/kids',
      text: 'KIDS',
    },
  ];
  const location = useLocation();
  useEffect(() => {
    setShowHamburgerLinks(false);
  }, [location]);
  return (
    <>
      <nav>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li
              key={link.id}
            >
              <NavLink to={link.path}>{link.text}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavLink;
