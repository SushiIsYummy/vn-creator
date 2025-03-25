import type { CharacterSprites } from '../vnData.types';

export function getCharacterSprite(
  spriteId: string,
  sprites: CharacterSprites,
) {
  return sprites ? sprites[spriteId] : null;
}
