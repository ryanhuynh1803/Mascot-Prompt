import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const parts: string[] = [];

  const get = (key: keyof PromptOptions) => options[key]?.trim();

  // Character
  const characterDescription = [];
  if (get('art_style')) characterDescription.push(`${get('art_style')} style`);
  if (get('age_gender_personality')) characterDescription.push(`${get('age_gender_personality')} character`);
  if (get('design_theme')) characterDescription.push(`in a ${get('design_theme')} theme`);
  
  if (characterDescription.length > 0) {
    parts.push(`A 3D mascot, ${characterDescription.join(', ')}`);
  } else {
    parts.push(`A 3D mascot`); // Base if no character options are selected
  }

  if (get('body_shape')) parts.push(`${get('body_shape')} body shape`);
  if (get('proportion_details')) parts.push(`${get('proportion_details')} proportions`);
  if (get('pose_and_attitude')) parts.push(`${get('pose_and_attitude')} pose`);

  // Costume
  if (get('costume_type')) parts.push(`${get('costume_type')} costume`);
  if (get('costume_description')) parts.push(`${get('costume_description')}`);
  if (get('accessory_detail')) parts.push(`with ${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) parts.push(`inspired by ${get('animal_or_theme_inspiration')}`);

  // Face
  if (get('hair_style')) parts.push(`${get('hair_style')} hair`);
  if (get('face_features')) parts.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) parts.push(`${get('emotion_or_attitude')} expression`);

  // Materials
  const materials = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  if (materials.length > 0) {
    parts.push(`materials: ${materials.join(', ')}`);
  }
  if (get('surface_feel')) parts.push(`${get('surface_feel')} surface feel`);

  // Environment
  if (get('lighting_style')) parts.push(`${get('lighting_style')} lighting`);
  if (get('background_type')) parts.push(`${get('background_type')} background`);

  // Context
  if (get('application_context')) parts.push(`for ${get('application_context')}`);

  // Filter out any empty strings and join with ", "
  return parts.filter(Boolean).join(', ');
};