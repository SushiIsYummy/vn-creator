import Character from '../Character/Character';
import DialogueBox from '../DialogueBox/DialogueBox';
import type { CharacterInstance } from '../VisualNovelPlayer/use-scene-controller';
import styles from './SceneRenderer.module.css';

type SceneRendererProps = {
  characters: CharacterInstance[];
  dialogue: string;
};

function SceneRenderer({ characters, dialogue }: SceneRendererProps) {
  return (
    <>
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
    </>
  );
}

export default SceneRenderer;
