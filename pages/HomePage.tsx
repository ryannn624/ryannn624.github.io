import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SEO from "../components/SEO";

// Keyframes
const shine = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

// Styled Components
const HomePageContainer = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0;
  padding-top: 0;

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 0, 0, 0.03),
      transparent
    );
    z-index: -1;
    animation: ${shine} 15s infinite linear;
  }

  @media screen and (max-width: 992px) {
    padding-top: 80px;
    padding-bottom: 60px;
    height: auto;
  }

  @media screen and (max-width: 768px) {
    padding-top: 60px;
  }

  @media screen and (max-width: 480px) {
    padding-top: 40px;
  }
`;

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 80px;
  width: 100%;
  max-width: 1280px;
  padding: 0 30px;
  min-height: 100%;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    gap: 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 20px;
  }
`;

const HomePageImage = styled(motion.div)`
  flex: 1;
  min-width: 320px;
  display: flex;
  justify-content: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 340px;
    height: 340px;
    border: 2px solid rgba(139, 195, 74, 0.4);
    border-radius: 16px;
    top: 20px;
    left: calc(50% - 170px);
    z-index: 1;
    animation: ${pulse} 4s infinite alternate;
  }

  &:after {
    content: "";
    position: absolute;
    width: 120px;
    height: 120px;
    background-color: rgba(139, 195, 74, 0.15);
    border-radius: 50%;
    bottom: -25px;
    right: 15%;
    z-index: 1;
    filter: blur(25px);
  }

  @media screen and (max-width: 992px) {
    &:before {
      width: 320px;
      height: 320px;
      left: calc(50% - 160px);
    }
  }

  @media screen and (max-width: 480px) {
    &:before {
      width: 280px;
      height: 280px;
      left: calc(50% - 140px);
    }
  }
`;

const ProfileImage = styled(motion.img)`
  width: 340px;
  height: 340px;
  object-fit: cover;
  border-radius: 16px;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);

  @media screen and (max-width: 992px) {
    width: 320px;
    height: 320px;
  }

  @media screen and (max-width: 480px) {
    width: 280px;
    height: 280px;
  }
`;

const HomePageText = styled(motion.div)`
  flex: 1;
  min-width: 320px;
  text-align: left;
  position: relative;
  padding-left: 20px;

  @media screen and (max-width: 992px) {
    text-align: center;
    padding-left: 0;
  }
`;

const MainHeading = styled(motion.h1)`
  font-size: 4.5em;
  margin-top: 0;
  margin-bottom: 15px;
  color: #212121;
  font-weight: 800;
  position: relative;
  display: inline-block;
  font-family: "Montserrat", sans-serif;
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);

  @media screen and (max-width: 768px) {
    font-size: 3.5em;
  }

  @media screen and (max-width: 480px) {
    font-size: 3em;
  }
`;

const SubHeading = styled(motion.h2)`
  font-size: 1.65em;
  margin-top: 0;
  margin-bottom: 35px;
  color: #424242;
  font-weight: 300;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 1px;

  @media screen and (max-width: 768px) {
    font-size: 1.8em;
    margin-bottom: 25px;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
`;

const InfoParagraph = styled(motion.p)`
  font-size: 1.15rem;
  line-height: 1.7;
  color: #505050;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
`;

const Icon = styled.i`
  margin-right: 12px;
`;

const HomePageNav = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 35px;

  @media screen and (max-width: 992px) {
    justify-content: center;
  }
`;

const HomepageCTA = styled(motion.div)`
  margin-top: 15px;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #8bc34a, #689f38);
  color: white;
  padding: 16px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.15em;
  border: none;
  cursor: pointer;
  letter-spacing: 1.2px;
  box-shadow: 0 8px 20px rgba(139, 195, 74, 0.35);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.8s ease;
  }

  &:hover {
    box-shadow: 0 10px 25px rgba(139, 195, 74, 0.5);
    transform: translateY(-3px);
  }

  &:hover:after {
    transform: translateX(100%);
  }

  @media screen and (max-width: 480px) {
    padding: 14px 34px;
    font-size: 1.05em;
  }
`;

const ContactSection = styled(motion.div)`
  margin-top: 40px;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: #8bc34a;
  font-size: 1.5em;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(139, 195, 74, 0.15);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(139, 195, 74, 0.1), transparent);
    transform: scale(0);
    transform-origin: center;
    border-radius: 50%;
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover {
    color: #689f38;
    background-color: white;
    box-shadow: 0 8px 20px rgba(139, 195, 74, 0.25);
    transform: translateY(-5px);
  }

  &:hover:before {
    transform: scale(1.5);
  }

  .fa-envelope {
    font-size: 0.95em;
  }

  @media screen and (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.4em;
  }
`;

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
      <HomePageContainer ref={ref}>
        <HomePageContent>
          <HomePageImage
            custom={-1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileAwareSlideIn}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <ProfileImage
              src="./Ryan.jpg"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 18px 35px rgba(0, 0, 0, 0.18)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            />
          </HomePageImage>

          <HomePageText
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileAwareSlideIn}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          >
            <MainHeading
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              RYAN
            </MainHeading>
            <SubHeading
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            >
              牛靖燃 우정연
            </SubHeading>

            <InfoParagraph
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Icon
                className="far fa-calendar-alt"
                style={{ color: "#8bc34a" }}
              />
              2002.06.24
            </InfoParagraph>

            <InfoParagraph
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Icon
                className="fas fa-map-marker-alt"
                style={{ color: "#8bc34a" }}
              />
              Based in Seoul, South Korea
            </InfoParagraph>

            <HomePageNav
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            >
              <HomepageCTA>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CTAButton
                    to="/portfolio"
                    style={{
                      display: "block",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Icon className="fas fa-images" />
                    Portfolio
                  </CTAButton>
                </motion.div>
              </HomepageCTA>
            </HomePageNav>

            <ContactSection
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            >
              <SocialLinks variants={fadeIn}>
                <SocialLink
                  href="mailto:ryanran624@gmail.com"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -5,
                    boxShadow: "0 8px 20px rgba(139, 195, 74, 0.25)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <i className="fas fa-envelope"></i>
                </SocialLink>
                <SocialLink
                  href="https://www.instagram.com/ryannn624_"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -5,
                    boxShadow: "0 8px 20px rgba(139, 195, 74, 0.25)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <i className="fab fa-instagram"></i>
                </SocialLink>
              </SocialLinks>
            </ContactSection>
          </HomePageText>
        </HomePageContent>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
