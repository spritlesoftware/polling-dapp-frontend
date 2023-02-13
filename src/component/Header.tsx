import React from "react";
import Spritle from '../assets/spritle_logo.png'
import './Header.css'
const Header = () => {
    return (
      <header>
        <img src={Spritle} alt="Spritle" className="spritle" />
      </header>
    );
  };
  
  export default Header;