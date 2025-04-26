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
import SEO from "../components/SEO";
import "../styles/portfolio.css";

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
  icon: string; // Font Awesome icon class
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

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Unified gallery collection with all information
  const galleryCollection: GalleryCollection = useMemo(
    () => ({
      pen: {
        title: "Pen",
        icon: "fas fa-user",
        photos: [
          {
            image: "./pen/pen1.jpg",
            date: "June 18, 2024",
            location: "Hong Kong, China",
            camera: "Sony a5100",
          },
        ],
      },
      "rural-scenes": {
        title: "Rural Scenes",
        icon: "fas fa-tree",
        photos: [
          {
            image: "./rural/sheep.jpg",
            date: "December 24, 2023",
            location: "Baicheng, Jilin, China",
            camera: "Canon EOS 70D",
          },
        ],
      },
      duo: {
        title: "Duo",
        icon: "fas fa-user",
        photos: [
          {
            image: "./yanji/yanji1.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji2.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji3.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji4.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji5.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji6.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji7.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji8.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
          {
            image: "./yanji/yanji9.JPG",
            date: "December 24, 2023",
            location: "Yanji, Jilin, China",
            camera: "Canon EOS 70D",
          },
        ],
      },
    }),
    []
  );

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
        icon: "fas fa-camera",
        photos: [],
      },
    [galleryCollection, activeSeries]
  );

  // Convert to Lightbox slide format
  const slides = useMemo(
    () =>
      currentSeries.photos.map((item) => ({
        src: item.image,
        description: `${item.location} | ${item.date}${
          item.camera ? ` | ${item.camera}` : ""
        }`,
      })),
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
      <SEO
        title="Portfolio"
        description="View Ryan's photography portfolio featuring portrait and nature photography from locations around the world"
        keywords="photography portfolio, portrait photography, rural scenes, Yanji, Canon photography, Ryan photographer"
        canonical="https://ryannn624.github.io/#/portfolio"
        type="website"
        image="/yanji/yanji1.JPG"
      />
      <motion.div
        style={{ paddingTop: "60px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="portfolio-title">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            Portfolio
          </motion.h1>
        </div>

        <motion.div
          id="portfolio"
          className="container"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="portfolio-content-wrapper">
            <motion.div
              className="portfolio-navbar"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3>Series</h3>
              <ul className="series-list">
                {seriesList.map((series) => (
                  <li key={series}>
                    <motion.span
                      className={`series-item ${
                        activeSeries === series ? "active" : ""
                      }`}
                      onClick={() => handleSeriesChange(series)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i
                        className={
                          galleryCollection[series].icon || "fas fa-camera"
                        }
                        style={{ marginRight: "10px" }}
                      ></i>
                      {galleryCollection[series].title || series}
                    </motion.span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="gallery">
              <div className="series-title">
                <h2>{currentSeries.title || activeSeries}</h2>
                <p className="series-count">
                  {currentSeries.photos.length} photos
                </p>
              </div>

              <AnimatePresence mode="sync">
                <motion.div
                  key={activeSeries}
                  className="gallery-items-container"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0 }}
                >
                  {currentSeries.photos.length > 0 ? (
                    currentSeries.photos.map((item, index) => (
                      <motion.div
                        layout
                        key={`${activeSeries}-${index}`}
                        className={`gallery-item ${activeSeries} visible`}
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
                        <div className="image-wrapper">
                          <img src={item.image} alt={`Photo ${index + 1}`} />
                          {/* Magnifying glass effect on hover */}
                          <div className="image-overlay">
                            <span>
                              <i className="fas fa-search-plus"></i>
                            </span>
                          </div>
                          {/* Camera info displayed on hover */}
                          {item.camera && (
                            <div className="camera-indicator">
                              <i className="fas fa-camera"></i> {item.camera}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <i className="fas fa-search"></i>
                      No photos found in this series.
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={selectedItemIndex}
          slides={slides}
          plugins={[Captions, Thumbnails, Zoom, Counter, Fullscreen]}
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
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
            border: 2,
            borderRadius: 4,
            padding: 4,
            gap: 16,
          }}
          zoom={{ maxZoomPixelRatio: 3 }}
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
      </motion.div>
    </>
  );
};

export default PortfolioPage;
