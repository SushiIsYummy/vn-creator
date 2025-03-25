import { type Position } from '../../vnData.types';

type CharacterProps = {
  position: Position;
  sprite: string | null;
};

function Character({ position, sprite }: CharacterProps) {
  return (
    <img
      src={sprite ?? undefined}
      style={{ position: 'absolute', top: position.y, left: position.x }}
    />
  );
}

export default Character;
