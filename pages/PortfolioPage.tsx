import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../components/Lightbox";
import "../styles/portfolio.css";

interface GalleryItem {
  id: number;
  category: string;
  image: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  camera?: string;
  settings?: {
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
  };
}

const PortfolioPage: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string>("");
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | undefined>(
    undefined
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: "portrait",
      image: "./bf.jpg",
      title: "Portrait",
      date: "June 18, 2024",
      location: "Hong Kong, China",
      description: "My boyfriend",
      camera: "Sony A7 IV",
      settings: {
        aperture: "f/1.8",
        shutterSpeed: "1/125",
        iso: "200",
      },
    },
    {
      id: 2,
      category: "animals",
      image: "./animals1.jpg",
      title: "Sheep",
      date: "August 11, 2024",
      location: "Baicheng, Jilin, China",
      description: "My grandmother's sheep",
      camera: "Canon EOS R5",
      settings: {
        aperture: "f/4.0",
        shutterSpeed: "1/500",
        iso: "400",
      },
    },
    // Add more items as needed
  ];

  useEffect(() => {
    if (inView) {
      // Initial animation for gallery items with staggered effect
      let timeouts: NodeJS.Timeout[] = [];

      galleryItems.forEach((item, index) => {
        const timeout = setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, 150 * index);

        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }
  }, [inView]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (imgSrc: string, item?: GalleryItem) => {
    setLightboxImage(imgSrc);
    setSelectedPhoto(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "40px 0",
          fontSize: "2.5rem",
          color: "#333",
        }}
      >
        Portfolio
      </h1>

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
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>Categories</h3>
            <ul className="category-list">
              <li>
                <motion.span
                  className={`category-item ${
                    activeCategory === "all" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("all")}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  All Works
                </motion.span>
              </li>
              <li>
                <motion.span
                  className={`category-item ${
                    activeCategory === "portrait" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("portrait")}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Portrait
                </motion.span>
              </li>
              <li>
                <motion.span
                  className={`category-item ${
                    activeCategory === "animals" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("animals")}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Animal
                </motion.span>
              </li>
            </ul>
          </motion.div>

          <div className="gallery">
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className={`gallery-item ${item.category} ${
                    visibleItems.includes(item) ? "visible" : ""
                  }`}
                  onClick={() => openLightbox(item.image, item)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: visibleItems.includes(item) ? 1 : 0,
                    scale: visibleItems.includes(item) ? 1 : 0.8,
                    y: visibleItems.includes(item) ? 0 : 30,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.12)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="image-wrapper">
                    <img src={item.image} alt={item.title} />
                    <div className="image-overlay">
                      <span>
                        <i className="fas fa-search-plus"></i>
                      </span>
                    </div>
                    {item.camera && (
                      <div className="camera-indicator">
                        <i className="fas fa-camera"></i> {item.camera}
                      </div>
                    )}
                  </div>
                  <div className="item-details">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.title}
                    </motion.h3>

                    {item.description && (
                      <motion.p
                        className="item-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {item.description}
                      </motion.p>
                    )}

                    <div className="meta-info">
                      <div>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {item.location}
                      </div>
                      <div>
                        <i className="far fa-calendar"></i> {item.date}
                      </div>
                    </div>

                    {item.settings && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{
                          marginTop: "12px",
                          fontSize: "0.85em",
                          color: "#777",
                        }}
                      >
                        {item.settings.aperture && (
                          <span>
                            <i className="fas fa-circle"></i>{" "}
                            {item.settings.aperture}{" "}
                          </span>
                        )}
                        {item.settings.shutterSpeed && (
                          <span>
                            <i className="fas fa-stopwatch"></i>{" "}
                            {item.settings.shutterSpeed}s{" "}
                          </span>
                        )}
                        {item.settings.iso && (
                          <span>
                            <i className="fas fa-sliders-h"></i> ISO{" "}
                            {item.settings.iso}
                          </span>
                        )}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <Lightbox
        imgSrc={lightboxImage}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        photoData={selectedPhoto}
      />
    </div>
  );
};

export default PortfolioPage;
