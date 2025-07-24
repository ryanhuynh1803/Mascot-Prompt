export type BodyPart = 'character' | 'costume' | 'face' | 'materials' | 'environment' | 'context' | 'legs';

export const bodyPartsOrder: BodyPart[] = ['character', 'costume', 'legs', 'face', 'materials', 'environment', 'context'];

export interface PromptOptions {
  art_style: string;
  age_gender_personality: string;
  costume_type: string;
  design_theme: string;
  body_shape: string;
  proportion_details: string;
  pose_and_attitude: string;
  costume_description: string;
  accessory_detail: string;
  animal_or_theme_inspiration: string;
  hair_style: string;
  face_features: string;
  emotion_or_attitude: string;
  material_1: string;
  material_2: string;
  material_3: string;
  surface_feel: string;
  lighting_style: string;
  background_type: string;
  application_context: string;
  leg_shape: string;
  footwear: string;
  viewpoint: string; // New
  action: string; // New
}

export const defaultOptions: PromptOptions = {
  art_style: "Chibi",
  age_gender_personality: "young, friendly, curious",
  costume_type: "simple jumpsuit",
  design_theme: "modern tech",
  body_shape: "round and soft",
  proportion_details: "oversized head, small body",
  pose_and_attitude: "standing, waving cheerfully",
  costume_description: "minimalist, with a small logo",
  accessory_detail: "a small backpack",
  animal_or_theme_inspiration: "a playful fox",
  hair_style: "short and spiky",
  face_features: "large, expressive eyes and a wide smile",
  emotion_or_attitude: "joyful and approachable",
  material_1: "soft vinyl",
  material_2: "matte plastic",
  material_3: "smooth fabric",
  surface_feel: "smooth and tactile",
  lighting_style: "soft studio lighting",
  background_type: "clean white background",
  application_context: "educational mobile app",
  leg_shape: "short and stubby",
  footwear: "simple sneakers",
  viewpoint: "front view", // Default for new option
  action: "standing", // Default for new option
};

export const bodyPartOptions = {
  character: ['art_style', 'age_gender_personality', 'body_shape', 'proportion_details', 'pose_and_attitude', 'design_theme'],
  costume: ['costume_type', 'costume_description', 'accessory_detail', 'animal_or_theme_inspiration'],
  legs: ['leg_shape', 'footwear'],
  face: ['hair_style', 'face_features', 'emotion_or_attitude'],
  materials: ['material_1', 'material_2', 'material_3', 'surface_feel'],
  environment: ['lighting_style', 'background_type'],
  context: ['application_context', 'viewpoint', 'action'], // Added new options here
};