import { useRef, useEffect } from 'react';

type ResizePlayerOptions = {
  resolutionWidth?: number;
  resolutionHeight?: number;
};

function useResizePlayer({
  resolutionWidth = 1920,
  resolutionHeight = 1080,
}: ResizePlayerOptions = {}) {
  const vnPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function resizePlayer() {
      const vnPlayerDiv = vnPlayerRef.current;
      if (vnPlayerDiv) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scaleX = width / resolutionWidth;
        const scaleY = height / resolutionHeight;
        const scale = Math.min(scaleX, scaleY);

        // Apply scaling
        vnPlayerDiv.style.transform = `scale(${scale})`;

        // Center vertically and horizontally
        const newHeight = resolutionHeight * scale;
        const newWidth = resolutionWidth * scale;
        vnPlayerDiv.style.top = `${(height - newHeight) / 2}px`;
        vnPlayerDiv.style.left = `${(width - newWidth) / 2}px`;
      }
    }

    resizePlayer();
    window.addEventListener('resize', resizePlayer);

    return () => {
      window.removeEventListener('resize', resizePlayer);
    };
  }, [resolutionHeight, resolutionWidth]);

  return vnPlayerRef;
}

export default useResizePlayer;
