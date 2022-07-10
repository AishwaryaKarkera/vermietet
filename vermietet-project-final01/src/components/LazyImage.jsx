import React from "react";

import "./LazyImage.css";

/*
 * Image needs a ratio of 1:1 to fit the SVG placeholder.
 * This could be made configurable.
 */
 const useIntersectionObserver = (options = { rootMargin: "120px" }) => {
  const ref = React.useRef(null);
  const [isIntersected, setIsIntersected] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([element]) => {
      if (element.isIntersecting) {
        setIsIntersected(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { intersectionRef: ref, isIntersected };
};


export const LazyImage = ({ src, alt, color = "#F3F5F7" }) => {
  const { intersectionRef, isIntersected } = useIntersectionObserver();
  const url = isIntersected ? src : "";

  return (
    <div className="lazy-image">
      <div
        ref={intersectionRef}
        className="lazy-image_image"
        style={{ backgroundImage: `url("${url}")` }}
        aria-label={alt}
      />
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 1">
        <rect fill={color} height="1" width="1" />
      </svg>
    </div>
  );
};
