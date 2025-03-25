import VisualNovelPlayer from './features/visual-novel-player/components/VisualNovelPlayer/VisualNovelPlayer';
import type { VnData } from './features/visual-novel-player/vnData.types';
import { useValidateVN } from './features/visual-novel-player/components/VisualNovelPlayer/use-validate-vn';
import { useEffect, useState } from 'react';

function App() {
  const [vnData, setVnData] = useState<VnData | null>(null);

  useEffect(() => {
    fetch('/example-vn/example-vn.json')
      .then((response) => response.json())
      .then((data) => setVnData(data))
      .catch(console.error);
  }, []);

  const { data, loading, error } = useValidateVN(vnData);

  if (loading) {
    return <p>Loading Visual Novel...</p>;
  }

  if (error) {
    return <p>Error loading Visual Novel</p>;
  }

  if (!data) {
    return <p>No Visual Novel Data Available</p>;
  }

  return <VisualNovelPlayer vnData={data} />;
}

export default App;
