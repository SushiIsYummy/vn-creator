import type { CharacterData } from '../vnData.types';

export function getCharacter(characterId: string, characters: CharacterData[]) {
  return characters.find((character) => character.id === characterId) ?? null;
}
