import { CharacterData } from '../features/visual-novel-player/components/VisualNovelPlayer/vnData.types';

export function getCharacter(characterId: string, characters: CharacterData[]) {
  return characters.find((character) => character.id === characterId);
}
