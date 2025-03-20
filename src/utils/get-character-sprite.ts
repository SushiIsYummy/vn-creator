import {
  CharacterData,
  CharacterSprites,
} from '../features/visual-novel-player/components/VisualNovelPlayer/vnData.types';

export function getCharacterSprite(
  spriteId: string,
  sprites: CharacterSprites,
) {
  return sprites ? sprites[spriteId] : null;
}
