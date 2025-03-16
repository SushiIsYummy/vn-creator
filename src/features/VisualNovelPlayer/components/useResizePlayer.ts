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

  function resizePlayer() {
    const vnPlayerDiv = vnPlayerRef.current;
    if (vnPlayerDiv) {
      let width = window.innerWidth;
      let height = window.innerHeight;

      let scaleX = width / resolutionWidth;
      let scaleY = height / resolutionHeight;
      let scale = Math.min(scaleX, scaleY);

      // Apply scaling
      vnPlayerDiv.style.transform = `scale(${scale})`;

      // Center vertically and horizontally
      let newHeight = resolutionHeight * scale;
      let newWidth = resolutionWidth * scale;
      vnPlayerDiv.style.top = `${(height - newHeight) / 2}px`;
      vnPlayerDiv.style.left = `${(width - newWidth) / 2}px`;
    }
  }

  useEffect(() => {
    if (vnPlayerRef.current) {
      vnPlayerRef.current.style.width = `${resolutionWidth}px`;
      vnPlayerRef.current.style.height = `${resolutionHeight}px`;
    }
    resizePlayer();
    window.addEventListener('resize', resizePlayer);

    return () => {
      window.removeEventListener('resize', resizePlayer);
    };
  }, []);

  return vnPlayerRef;
}

export default useResizePlayer;
