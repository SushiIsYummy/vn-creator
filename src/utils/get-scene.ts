import { Scene } from '../features/visual-novel-player/components/VisualNovelPlayer/vnData.types';

export function getScene(sceneId: string, scenes: Scene[]) {
  return scenes.find((scene) => scene.id === sceneId);
}
