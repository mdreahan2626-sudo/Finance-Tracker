"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedSection({
  children,
  direction = "left", // 'left', 'right', 'up', 'scale'
  delay = 0,
  className = "",
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return "-translate-x-16 opacity-0";
      case "right":
        return "translate-x-16 opacity-0";
      case "up":
        return "translate-y-12 opacity-0";
      case "scale":
        return "scale-90 opacity-0";
      default:
        return "-translate-x-16 opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : getInitialTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}
