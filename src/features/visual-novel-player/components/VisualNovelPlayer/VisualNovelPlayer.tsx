import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useState,
} from 'react';
import DialogueBox from '../DialogueBox/DialogueBox';
import styles from './VisualNovelPlayer.module.css';
import useResizePlayer from './use-resize-player';
import { Scene, VnData } from './vnData.types';
import { getScene } from '../../../../utils/get-scene';
import Character from '../Character/Character';
import { useAdvanceActions } from './use-advance-actions';

function VisualNovelPlayer({ vnData }: { vnData: VnData }) {
  console.log(vnData);
  const [currentScene, setCurrentScene] = useState<Scene | null>(
    getScene('start_scene', vnData.scenes ?? []) ?? null,
  );
  const resolutionWidth = vnData.resolution.width;
  const resolutionHeight = vnData.resolution.height;

  const vnPlayerRef = useResizePlayer({
    resolutionWidth: resolutionWidth,
    resolutionHeight: resolutionHeight,
  });

  const { characters, dialogue, nextAction } = useAdvanceActions({
    vnData: vnData,
    scene: currentScene,
  });

  useEffect(() => {
    const vnPlayerElement = vnPlayerRef.current;
    if (vnPlayerElement) {
      vnPlayerElement.focus();
      vnPlayerElement.style.setProperty(
        '--resolution-width',
        `${resolutionWidth}`,
      );
      vnPlayerElement.style.setProperty(
        '--resolution-height',
        `${resolutionHeight}`,
      );
      vnPlayerElement.style.width = `${resolutionWidth}px`;
      vnPlayerElement.style.height = `${resolutionHeight}px`;
    }
  }, []);

  function advanceAction(e: MouseEvent | KeyboardEvent) {
    if (!shouldAdvanceAction(e)) return;
    nextAction();
  }

  function shouldAdvanceAction(e: MouseEvent | KeyboardEvent): boolean {
    return (
      ('key' in e && (e.key === 'Enter' || e.code === 'Space')) ||
      ('type' in e && e.type === 'click')
    );
  }

  return (
    <div className={styles.vnContainer}>
      <div
        ref={vnPlayerRef}
        className={styles.vnPlayer}
        onClick={advanceAction}
        onKeyDown={advanceAction}
        tabIndex={-1}
      >
        <div className={styles.transparentGrid}></div>
        <div className={styles.backgroundImage}></div>
        <div className={styles.characters}>
          {characters.map((character) => (
            <Character
              key={character.id}
              position={character.position}
              sprite={character.sprite}
            />
          ))}
        </div>
        <DialogueBox dialogue={dialogue} />
      </div>
    </div>
  );
}

export default VisualNovelPlayer;
