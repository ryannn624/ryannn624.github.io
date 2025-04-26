import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "../styles/homepage.css";

const HomePage: React.FC = () => {
  // Using intersection observer to track when element is in view
  const { ref, inView } = useInView({
    threshold: 0.1, // Reduced threshold for better mobile responsiveness
    triggerOnce: true,
  });

  // Making sure the page scrolls to top when loaded for mobile
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for consistent effects
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideIn = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction * 50,
    }),
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  // Responsive animation variants that work better on mobile
  const mobileAwareSlideIn = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: window.innerWidth < 768 ? 0 : direction * 50,
      y: window.innerWidth < 768 ? 30 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <>
      <SEO
        title="Home"
        description="Ryan's personal photography portfolio homepage - View my profile and portfolio of portrait and animal photography"
        keywords="photography, homepage, Ryan, 牛靖燃, professional photographer, Seoul"
        canonical="https://ryannn624.github.io/"
        type="website"
      />
      <div className="homepage" ref={ref}>
        <div className="homepage-content">
          <motion.div
            className="homepage-image"
            custom={-1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileAwareSlideIn}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <motion.img
              src="./Ryan.jpg"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            />
          </motion.div>

          <motion.div
            className="homepage-text"
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileAwareSlideIn}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              RYAN
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            >
              牛靖燃 우정연
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}
            >
              <i
                className="far fa-calendar-alt"
                style={{ color: "#8bc34a", marginRight: "8px" }}
              ></i>
              2002.06.24
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}
            >
              <i
                className="fas fa-map-marker-alt"
                style={{ color: "#8bc34a", marginRight: "8px" }}
              ></i>
              Based in Seoul, South Korea
            </motion.p>

            <motion.div
              className="homepage-nav"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            >
              <motion.div className="homepage-cta">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/portfolio"
                    className="cta-button"
                    style={{
                      display: "block",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <i
                      className="fas fa-images"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Portfolio
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="contact-section"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            >
              <motion.div className="social-links" variants={fadeIn}>
                <motion.a
                  href="mailto:ryanran624@gmail.com"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <i className="fas fa-envelope"></i>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/ryannn624_"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <i className="fab fa-instagram"></i>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
