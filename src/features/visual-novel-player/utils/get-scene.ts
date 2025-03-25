import type { Scene } from '../vnData.types';

export function getScene(sceneId: string, scenes: Scene[]) {
  return scenes.find((scene) => scene?.id === sceneId) ?? null;
}
