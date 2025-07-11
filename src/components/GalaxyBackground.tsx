import React, { useEffect } from 'react';

export const GalaxyBackground: React.FC = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 10 + 8;
      
      star.style.left = x + 'px';
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.animationDuration = duration + 's';
      
      const starsContainer = document.querySelector('.stars');
      if (starsContainer) {
        starsContainer.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
          if (star.parentNode) {
            star.parentNode.removeChild(star);
          }
        }, duration * 1000);
      }
    };

    // Create initial stars
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createStar(), i * 100);
    }

    // Continuously create new stars
    const starInterval = setInterval(createStar, 200);

    return () => {
      clearInterval(starInterval);
    };
  }, []);

  return (
    <div className="galaxy-container">
      <div className="twinkle"></div>
      <div className="stars"></div>
    </div>
  );
};