import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/lightbox.css";

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

interface LightboxProps {
  imgSrc: string;
  isOpen: boolean;
  onClose: () => void;
  photoData?: GalleryItem;
}

const Lightbox: React.FC<LightboxProps> = ({ imgSrc, isOpen, onClose, photoData }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).classList.contains("lightbox") ||
      (e.target as HTMLElement).classList.contains("close")
    ) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
        >
          <motion.span
            className="close"
            onClick={onClose}
            whileHover={{ scale: 1.1, color: "#333" }}
            whileTap={{ scale: 0.95 }}
          >
            &times;
          </motion.span>
          
          <motion.img
            className="lightbox-content"
            src={imgSrc}
            alt={photoData?.title || "Lightbox Image"}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          />
          
          <div className="lightbox-controls">
            <div className="photo-info">
              <motion.div
                className="photo-meta"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {photoData && (
                  <>
                    <div className="photo-title">{photoData.title}</div>
                    <div className="photo-details">
                      <span>
                        <i className="fas fa-map-marker-alt"></i> {photoData.location}
                      </span>
                      <span>
                        <i className="far fa-calendar"></i> {photoData.date}
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
            
            <motion.div
              className="camera-details"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {photoData?.camera && (
                <div className="tech-specs">
                  <span className="camera-model">
                    <i className="fas fa-camera"></i> {photoData.camera}
                  </span>
                  
                  {photoData.settings && (
                    <>
                      {photoData.settings.aperture && (
                        <span className="setting">
                          <i className="fas fa-circle"></i> {photoData.settings.aperture}
                        </span>
                      )}
                      {photoData.settings.shutterSpeed && (
                        <span className="setting">
                          <i className="fas fa-stopwatch"></i> {photoData.settings.shutterSpeed}s
                        </span>
                      )}
                      {photoData.settings.iso && (
                        <span className="setting">
                          <i className="fas fa-sliders-h"></i> ISO {photoData.settings.iso}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
              
              <div className="nav-hint">
                Press <span>ESC</span> to close
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
