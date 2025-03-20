import { Position } from '../VisualNovelPlayer/vnData.types';

type CharacterProps = {
  position: Position;
  sprite: string | undefined;
};

function Character({ position, sprite }: CharacterProps) {
  return (
    <img
      src={sprite}
      // src={'/src/bob_normal.png'}
      style={{ position: 'absolute', top: position.y, left: position.x }}
    />
  );
}

export default Character;
