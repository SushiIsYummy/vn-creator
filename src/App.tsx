import VisualNovelPlayer from './features/visual-novel-player/components/VisualNovelPlayer/VisualNovelPlayer';
import { VnData } from './features/visual-novel-player/components/VisualNovelPlayer/vnData.types';
import { useValidateVN } from './features/visual-novel-player/components/VisualNovelPlayer/use-validate-vn';
import { useState } from 'react';

function App() {
  const p = fetch('/example-vn/example-vn.json')
    .then((response) => response.json())
    .then((data) => console.log(data));

  const { data, loading, error } = useValidateVN(p);

  console.log(`data: ${data}`);
  console.log(`loading: ${loading}`);
  console.log(`error: ${error}`);
  if (loading) {
    return <p>Loading Visual Novel...</p>;
  }

  if (error) {
    return <p>Error loading Visual Novel</p>;
  }

  // Only render VisualNovelPlayer if data is not null
  // if (!data) {
  //   return <p>No Visual Novel Data Available</p>;
  // }
  console.log(data);
  return <VisualNovelPlayer vnData={data} />;
}

export default App;
