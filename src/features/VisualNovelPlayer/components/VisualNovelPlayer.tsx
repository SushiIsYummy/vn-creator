import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useState,
} from 'react';
import DialogueBox from './DialogueBox';
import styles from './VisualNovelPlayer.module.css';
import useResizePlayer from './useResizePlayer';

function VisualNovelPlayer() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const resolutionWidth = 1920;
  const resolutionHeight = 1080;

  const dialogues = [
    'Hey you there!',
    "I see you but you can't see me.",
    'How unfortunate for you HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA',
    'wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow ',
  ];
  const currentDialogue = dialogues[currentDialogueIndex];

  const vnPlayerRef = useResizePlayer({
    resolutionWidth: resolutionWidth,
    resolutionHeight: resolutionHeight,
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
    }
  }, []);

  function advanceDialogue(e: MouseEvent | KeyboardEvent) {
    if (!shouldAdvanceDialogue(e)) {
      return;
    }
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex((prev) => prev + 1);
    }
  }

  function shouldAdvanceDialogue(e: MouseEvent | KeyboardEvent): boolean {
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
        onClick={advanceDialogue}
        onKeyDown={advanceDialogue}
        tabIndex={-1}
      >
        <div className={styles.transparentGrid}></div>
        <div className={styles.backgroundImage}></div>
        <DialogueBox dialogue={currentDialogue} />
      </div>
    </div>
  );
}

export default VisualNovelPlayer;
