import { z } from 'zod';

export const CharacterPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const ResolutionSchema = z.object({
  width: z.number(),
  height: z.number(),
});

export const CharacterSpritesSchema = z
  .record(z.string(), z.string())
  .nullable();

export const CharacterDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  sprites: CharacterSpritesSchema,
});

export const DialogueActionSchema = z.object({
  type: z.literal('dialogue'),
  text: z.string(),
});

export const ShowCharacterActionSchema = z.object({
  type: z.literal('showCharacter'),
  characterId: z.string(),
  sprite: z.string(),
  position: CharacterPositionSchema,
});

export const ActionSchema = z.discriminatedUnion('type', [
  DialogueActionSchema,
  ShowCharacterActionSchema,
]);

export const SceneSchema = z
  .object({
    id: z.string(),
    actions: z.array(ActionSchema),
  })
  .nullable();

export const VnDataSchema = z.object({
  title: z.string(),
  author: z.string(),
  resolution: ResolutionSchema,
  characters: z.array(CharacterDataSchema),
  scenes: z.array(SceneSchema),
});

export type Position = z.infer<typeof CharacterPositionSchema>;
export type Resolution = z.infer<typeof ResolutionSchema>;
export type CharacterSprites = z.infer<typeof CharacterSpritesSchema>;
export type CharacterData = z.infer<typeof CharacterDataSchema>;
export type DialogueAction = z.infer<typeof DialogueActionSchema>;
export type ShowCharacterAction = z.infer<typeof ShowCharacterActionSchema>;
export type Action = z.infer<typeof ActionSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type VnData = z.infer<typeof VnDataSchema>;
