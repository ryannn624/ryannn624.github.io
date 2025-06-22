import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import SEO from "../components/SEO";

// Styled Components
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PortfolioContainer = styled(motion.div)`
  padding-top: 60px;
`;

const PortfolioSection = styled.div`
  padding: 30px 0 70px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PortfolioTitleSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
`;

const PortfolioHeading = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 4px;
    background-color: #8bc34a;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  @media screen and (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  position: relative;

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const Navbar = styled(motion.div)`
  width: 240px;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  align-self: flex-start;
  position: sticky;
  top: 80px;
  margin-right: 30px;
  backdrop-filter: none;
  border: none;

  @media screen and (max-width: 992px) {
    width: 100%;
    position: relative;
    top: 0;
    border-right: none;
    margin-right: 0;
    margin-bottom: 30px;
    padding: 20px;
  }
`;

const NavbarHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 3px;
    background-color: #8bc34a;
    bottom: -8px;
    left: 20px;
    border-radius: 2px;
  }

  @media screen and (max-width: 992px) {
    text-align: center;
    padding-left: 0;

    &:before {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const SeriesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 0 10px;
  }
`;

const SeriesListItem = styled.li`
  margin: 0;
  padding: 0;

  @media screen and (max-width: 992px) {
    margin-bottom: 10px;
  }
`;

interface SeriesItemProps {
  $active: boolean;
}

const SeriesItem = styled(motion.span)<SeriesItemProps>`
  display: block;
  padding: 12px 20px;
  color: #555;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-left: 3px solid
    ${(props) => (props.$active ? "#8bc34a" : "transparent")};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: ${(props) => (props.$active ? "#689f38" : "#555")};
  background-color: ${(props) =>
    props.$active ? "rgba(139, 195, 74, 0.08)" : "transparent"};
  font-weight: ${(props) => (props.$active ? "500" : "normal")};

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    background-color: rgba(139, 195, 74, 0.08);
    top: 0;
    left: 0;
    z-index: -1;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #333;
    border-left: 3px solid
      ${(props) => (props.$active ? "#8bc34a" : "rgba(139, 195, 74, 0.5)")};

    &:after {
      width: 100%;
    }
  }

  @media screen and (max-width: 992px) {
    padding: 8px 16px;
    margin-right: 5px;
    border-left: none;
    border-bottom: 2px solid transparent;
    border-radius: 20px;
    font-size: 0.95rem;

    &.active {
      border-left: none;
      border-bottom: none;
      background-color: rgba(139, 195, 74, 0.15);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    &:hover {
      border-left: none;
    }
  }
`;

const GallerySection = styled.div`
  flex: 1;
`;

const SeriesTitle = styled.div`
  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const SeriesHeading = styled.h2`
  @media screen and (max-width: 992px) {
    margin-bottom: 12px;

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const SeriesTimestamp = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0 15px 0;
  font-style: italic;

  @media screen and (max-width: 992px) {
    text-align: center;
  }
`;

const SeriesCount = styled.p`
  @media screen and (max-width: 992px) {
    /* No specific styles needed */
  }
`;

const GalleryItemsContainer = styled(motion.div)`
  column-count: 3;
  column-gap: 20px;
  width: 100%;

  @media screen and (max-width: 992px) {
    column-count: 2;
  }

  @media screen and (max-width: 576px) {
    column-count: 1;
  }
`;

interface GalleryItemProps {
  $visible: boolean;
}

const GalleryItem = styled(motion.div)<GalleryItemProps>`
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
  break-inside: avoid;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) =>
    props.$visible ? "translateY(0)" : "translateY(20px)"};
  animation: ${fadeInUp} 0.6s forwards;

  @media screen and (max-width: 576px) {
    max-width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: transparent;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const CameraIndicator = styled.div`
  display: none;
`;

const NoResults = styled(motion.div)`
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px 0;
  color: #666;
  font-size: 1.2em;

  i {
    font-size: 3em;
    color: rgba(139, 195, 74, 0.4);
    margin-bottom: 20px;
    display: block;
  }
`;

// YaRL lightbox customization
const YarlGlobalStyle = createGlobalStyle`
  :root {
    --yarl__color_backdrop: rgba(0, 0, 0, 0.95);
    --yarl__slide_captions_container_background: rgba(0, 0, 0, 0.6);
    --yarl__color_button: rgba(255, 255, 255, 0.8);
    --yarl__color_button_active: #8bc34a;
    --yarl__thumbnails_thumbnail_active_border_color: #8bc34a;
    --yarl__thumbnails_thumbnail_border_color: rgba(255, 255, 255, 0.3);
    --yarl__color_button_hover: white;
  }

  .yarl__thumbnails_thumbnail {
    transition: all 0.3s ease;
    opacity: 0.7;
  }

  .yarl__thumbnails_thumbnail:hover {
    transform: translateY(-3px);
    opacity: 1;
  }

  .yarl__thumbnails_thumbnail_active {
    opacity: 1;
    box-shadow: 0 3px 10px rgba(139, 195, 74, 0.5);
  }

  .yarl__button {
    background-color: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(4px);
  }

  .yarl__button:hover {
    background-color: rgba(0, 0, 0, 0.6) !important;
  }

  .yarl__slide_captions_container {
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .yarl__slide_title {
    position: relative;
    padding-bottom: 10px;
  }

  .yarl__slide_title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #8bc34a;
  }

  .yarl__slide_description {
    margin-top: 8px;
    font-style: normal;
    line-height: 1.6;
  }

  .yarl__counter_container {
    background-color: rgba(0, 0, 0, 0.5) !important;
    border-radius: 20px !important;
    padding: 4px 12px !important;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 500 !important;
  }
`;

// Modified interface definition for photo items
interface PhotoItem {
  image: string;
  date: string;
  location: string;
  camera?: string;
}

// Extended Series information
interface SeriesInfo {
  title: string; // Display name
  start?: string; // Start time
  end?: string; // End time
  photos: PhotoItem[];
}

// Gallery collection organized by series
interface GalleryCollection {
  [seriesKey: string]: SeriesInfo;
}

const PortfolioPage: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [activeSeries, setActiveSeries] = useState<string>("");
  const [isChangingSeries, setIsChangingSeries] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [galleryCollection, setGalleryCollection] = useState<GalleryCollection>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Format timestamp for series
  const formatTimestamp = (start?: string, end?: string): string => {
    if (!start && !end) return "";
    if (!start) return end || "";
    if (!end) return start;
    if (start === end) return start;
    return `${start} ~ ${end}`;
  };

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/data/portfolio.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch portfolio data: ${response.statusText}`
          );
        }
        const data = await response.json();
        setGalleryCollection(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading portfolio data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load portfolio data"
        );
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Get all series keys
  const seriesList = useMemo(
    () => Object.keys(galleryCollection),
    [galleryCollection]
  );

  // Set initial active series to the first series
  useEffect(() => {
    if (seriesList.length > 0 && activeSeries === "") {
      setActiveSeries(seriesList[0]);
    }
  }, [seriesList, activeSeries]);

  // Handle series change
  const handleSeriesChange = useCallback(
    (series: string) => {
      if (series === activeSeries || isChangingSeries) return;

      setIsChangingSeries(true);
      setActiveSeries(series);
      setIsChangingSeries(false);
    },
    [activeSeries, isChangingSeries]
  );

  // Current series items
  const currentSeries = useMemo(
    () =>
      galleryCollection[activeSeries] || {
        title: "",
        photos: [],
      },
    [galleryCollection, activeSeries]
  );

  // Convert to Lightbox slide format
  const slides = useMemo(
    () =>
      currentSeries.photos.map((item) => {
        const descriptionParts = [];
        if (item.location) descriptionParts.push(item.location);
        if (item.date) descriptionParts.push(item.date);
        if (item.camera) descriptionParts.push(item.camera);

        return {
          src: item.image,
          description: descriptionParts.join(" | "),
        };
      }),
    [currentSeries]
  );

  const openLightbox = useCallback((index: number) => {
    setSelectedItemIndex(index);
    setIsLightboxOpen(true);
  }, []);

  // Handle keyboard navigation (in gallery only, Lightbox has its own navigation)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isLightboxOpen) return;
      if (currentSeries.photos.length === 0) return;

      switch (e.key) {
        case "ArrowRight":
          openLightbox((selectedItemIndex + 1) % currentSeries.photos.length);
          break;
        case "ArrowLeft":
          openLightbox(
            (selectedItemIndex - 1 + currentSeries.photos.length) %
              currentSeries.photos.length
          );
          break;
        case "Enter":
          if (!isLightboxOpen) setIsLightboxOpen(true);
          break;
        default:
          break;
      }
    },
    [
      selectedItemIndex,
      isLightboxOpen,
      currentSeries.photos.length,
      openLightbox,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <YarlGlobalStyle />
      <SEO
        title="Portfolio"
        description="View Ryan's photography portfolio featuring portrait and nature photography from locations around the world"
        keywords="photography portfolio, portrait photography, rural scenes, Yanji, Canon photography, Ryan photographer"
        canonical="https://ryannn624.github.io/#/portfolio"
        type="website"
        image="/yanji/yanji1.JPG"
      />
      <PortfolioContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PortfolioTitleSection>
          <PortfolioHeading
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            Portfolio
          </PortfolioHeading>
        </PortfolioTitleSection>

        <PortfolioSection id="portfolio" className="container" ref={ref}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <i
                className="fas fa-spinner fa-spin"
                style={{
                  fontSize: "2rem",
                  marginBottom: "20px",
                  display: "block",
                }}
              ></i>
              <p>Loading portfolio...</p>
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 0",
                color: "#e53935",
              }}
            >
              <i
                className="fas fa-exclamation-circle"
                style={{
                  fontSize: "2rem",
                  marginBottom: "20px",
                  display: "block",
                }}
              ></i>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: "20px",
                  padding: "8px 16px",
                  background: "#8bc34a",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <ContentWrapper>
              <Navbar
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <NavbarHeading>Series</NavbarHeading>
                <SeriesList>
                  {seriesList.map((series) => (
                    <SeriesListItem key={series}>
                      <SeriesItem
                        $active={activeSeries === series}
                        onClick={() => handleSeriesChange(series)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {galleryCollection[series]?.title || series}
                      </SeriesItem>
                    </SeriesListItem>
                  ))}
                </SeriesList>
              </Navbar>

              <GallerySection>
                <SeriesTitle>
                  <SeriesHeading>
                    {currentSeries.title || activeSeries}
                  </SeriesHeading>
                  {formatTimestamp(currentSeries.start, currentSeries.end) && (
                    <SeriesTimestamp>
                      {formatTimestamp(currentSeries.start, currentSeries.end)}
                    </SeriesTimestamp>
                  )}
                </SeriesTitle>

                <AnimatePresence mode="sync">
                  <GalleryItemsContainer
                    key={activeSeries}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0 }}
                  >
                    {currentSeries.photos.length > 0 ? (
                      currentSeries.photos.map((item, index) => (
                        <GalleryItem
                          layout
                          key={`${activeSeries}-${index}`}
                          $visible={true}
                          className={`gallery-item ${activeSeries}`}
                          onClick={() => openLightbox(index)}
                          variants={{
                            hidden: { opacity: 1 },
                            visible: { opacity: 1 },
                          }}
                          initial="visible"
                          animate="visible"
                          exit={{ opacity: 1 }}
                          transition={{ duration: 0 }}
                          whileHover={{
                            y: -4,
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.12)",
                            transition: { duration: 0.3 },
                          }}
                        >
                          <ImageWrapper>
                            <Image
                              src={item.image}
                              alt={`Photo ${index + 1}`}
                            />
                            {/* Magnifying glass effect on hover */}
                            <ImageOverlay>
                              <span>
                                <i className="fas fa-search-plus"></i>
                              </span>
                            </ImageOverlay>
                            {/* Camera info displayed on hover */}
                            {item.camera && (
                              <CameraIndicator>
                                <i className="fas fa-camera"></i> {item.camera}
                              </CameraIndicator>
                            )}
                          </ImageWrapper>
                        </GalleryItem>
                      ))
                    ) : (
                      <NoResults
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <i className="fas fa-search"></i>
                        No photos found in this series.
                      </NoResults>
                    )}
                  </GalleryItemsContainer>
                </AnimatePresence>
              </GallerySection>
            </ContentWrapper>
          )}
        </PortfolioSection>

        <Lightbox
          open={isLightboxOpen}
          close={() => {
            setIsLightboxOpen(false);
            setIsFullscreen(false);
          }}
          index={selectedItemIndex}
          slides={slides}
          plugins={[
            Captions,
            Zoom,
            Counter,
            Fullscreen,
            ...(isFullscreen ? [] : [Thumbnails]),
          ]}
          captions={{ showToggle: true, descriptionTextAlign: "center" }}
          counter={{
            container: {
              style: {
                top: "unset",
                bottom: "0",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              },
            },
          }}
          carousel={{ finite: currentSeries.photos.length <= 1 }}
          thumbnails={
            !isFullscreen
              ? {
                  position: "bottom",
                  width: 120,
                  height: 80,
                  border: 2,
                  borderRadius: 4,
                  padding: 4,
                  gap: 16,
                }
              : undefined
          }
          zoom={{ maxZoomPixelRatio: 3 }}
          on={{
            enterFullscreen: () => setIsFullscreen(true),
            exitFullscreen: () => {
              setIsFullscreen(false);
            },
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
            captionsTitle: {
              fontSize: "1.2em",
              fontWeight: 600,
              color: "white",
            },
            captionsDescription: {
              fontSize: "0.9em",
              color: "rgba(255, 255, 255, 0.8)",
            },
          }}
          animation={{ swipe: 500 }}
          render={{
            iconPrev: () => <i className="fas fa-chevron-left"></i>,
            iconNext: () => <i className="fas fa-chevron-right"></i>,
            iconClose: () => <i className="fas fa-times"></i>,
            iconZoomIn: () => <i className="fas fa-search-plus"></i>,
            iconZoomOut: () => <i className="fas fa-search-minus"></i>,
            iconEnterFullscreen: () => <i className="fas fa-expand"></i>,
            iconExitFullscreen: () => <i className="fas fa-compress"></i>,
          }}
        />
      </PortfolioContainer>
    </>
  );
};

export default PortfolioPage;
