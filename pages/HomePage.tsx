import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/homepage.css";

const HomePage: React.FC = () => {
  // Using intersection observer to track when element is in view
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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

  return (
    <div className="homepage" ref={ref}>
      <div className="homepage-content">
        <motion.div
          className="homepage-image"
          custom={-1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideIn}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <motion.img
            src="./NJR.jpg"
            alt="Ryan - Professional Photographer"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut",
            }}
          />
        </motion.div>

        <motion.div
          className="homepage-text"
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideIn}
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
            style={{ fontSize: "1.1rem" }}
          >
            2002.06.24
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontSize: "1.1rem" }}
          >
            Base in Seoul
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
                  portfolio
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
                  scale: 1.2,
                  backgroundColor: "rgba(139, 195, 74, 0.3)",
                }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <i className="fas fa-envelope"></i>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/ryannn624_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(139, 195, 74, 0.3)",
                }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
