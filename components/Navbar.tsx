import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

// Styled Components
const NavbarContainer = styled(motion.nav)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: ${({ $scrolled }) => ($scrolled ? "5px 0" : "8px 0")};
  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(139, 195, 74, 0.95)" : "rgba(139, 195, 74, 0.8)"};
  backdrop-filter: blur(8px);
  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? "0 2px 10px rgba(104, 159, 56, 0.2)"
      : "0 1px 5px rgba(104, 159, 56, 0.1)"};
  transition: all 0.3s ease-in-out;
  animation: ${slideDown} 0.5s ease-out;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  animation: ${fadeIn} 0.6s ease-in-out;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  position: relative;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 1px;

  &:hover {
    color: #f8f8f8;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${({ $isActive }) =>
    $isActive ? "white" : "rgba(255, 255, 255, 0.85)"};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  font-size: 0.95rem;
  position: relative;
  padding: 0.4rem 0;
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }

  &:hover {
    color: white;

    &:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <NavContent>
        <Logo to="/">Ryan</Logo>

        <NavLinks>
          <NavItem whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
            <NavLink to="/" $isActive={location.pathname === "/"}>
              Home
            </NavLink>
          </NavItem>

          <NavItem whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
            <NavLink
              to="/portfolio"
              $isActive={location.pathname === "/portfolio"}
            >
              Portfolio
            </NavLink>
          </NavItem>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
