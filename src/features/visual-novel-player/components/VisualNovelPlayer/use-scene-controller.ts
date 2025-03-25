import { useEffect, useState } from 'react';
import type { Action, Position, Scene, VnData } from '../../vnData.types';
import { getCharacter } from '../../utils/get-character';
import { getCharacterSprite } from '../../utils/get-character-sprite';

type CharacterData = VnData['characters'];

type CharacterInstance = {
  id: string;
  sprite: string | null;
  position: Position;
};

type useSceneControllerProps = {
  scene: Scene;
  allCharacterData: CharacterData;
};

export function useSceneController({
  scene,
  allCharacterData,
}: useSceneControllerProps) {
  const [characters, setCharacters] = useState<CharacterInstance[]>([]);
  const [dialogue, setDialogue] = useState('');
  const [actionIndex, setActionIndex] = useState(0);

  useEffect(() => {
    const actions: Action[] = scene?.actions || [];

    function executeAction(action: Action) {
      switch (action.type) {
        case 'dialogue': {
          setDialogue(action.text);
          break;
        }
        case 'showCharacter':
          {
            const characterData = getCharacter(
              action.characterId,
              allCharacterData,
            );
            const sprite = getCharacterSprite(
              action.sprite,
              characterData?.sprites ?? null,
            );
            setCharacters((characters) => [
              ...characters,
              {
                id: action.characterId,
                sprite: sprite,
                position: action.position,
              },
            ]);
          }
          break;
      }
    }

    function hasNextAction() {
      return actionIndex >= 0 && actionIndex < actions.length;
    }

    if (hasNextAction()) {
      executeAction(actions[actionIndex]);
    }
  }, [actionIndex, allCharacterData, scene]);

  function nextAction() {
    setActionIndex((prev) => prev + 1);
  }

  return {
    characters,
    dialogue,
    nextAction,
  };
}
