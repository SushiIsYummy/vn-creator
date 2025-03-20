import { useEffect, useState } from 'react';
import { Action, Position, Scene, VnData } from './vnData.types';
import { getCharacter } from '../../../../utils/get-character';
import { getCharacterSprite } from '../../../../utils/get-character-sprite';

type useAdvanceActionsProps = {
  vnData: VnData;
  scene: Scene;
};

export function useAdvanceActions({ vnData, scene }: useAdvanceActionsProps) {
  // State needed for action execution
  const [characters, setCharacters] = useState<
    {
      id: string;
      // name: string;
      sprite: string | null;
      position: Position;
    }[]
  >([]);
  const [dialogue, setDialogue] = useState('');
  const [actionIndex, setActionIndex] = useState(0);

  const actions: Action[] = scene?.actions || [];
  const globalCharacters = vnData.characters;

  useEffect(() => {
    if (actionIndex >= 0 && actionIndex < actions.length) {
      executeAction(actions[actionIndex]);
    }
  }, [actionIndex, actions]);

  function nextAction() {
    setActionIndex((prev) => prev + 1);
  }

  function executeAction(action: Action) {
    switch (action.type) {
      case 'dialogue':
        setDialogue(action.text);
        break;
      case 'showCharacter':
        const globalCharacter = getCharacter(
          action.characterId,
          globalCharacters,
        );
        const sprite = getCharacterSprite(
          action.sprite,
          globalCharacter?.sprites ?? null,
        );
        setCharacters((characters) => [
          ...characters,
          {
            id: action.characterId,
            sprite: sprite,
            position: action.position,
          },
        ]);
        break;
    }
  }

  return {
    characters,
    dialogue,
    nextAction,
  };
}
