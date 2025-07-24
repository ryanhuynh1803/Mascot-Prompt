import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const parts: string[] = [];
  const get = (key: keyof PromptOptions) => options[key]?.trim();

  parts.push("Generate a 3D mascot.");

  const characterDetails = [];
  if (get('art_style')) characterDetails.push(`${get('art_style')} style`);
  if (get('age_gender_personality')) characterDetails.push(`${get('age_gender_personality')} character`);
  if (get('design_theme')) characterDetails.push(`${get('design_theme')} theme`);
  if (get('body_shape')) characterDetails.push(`${get('body_shape')} body`);
  if (get('proportion_details')) characterDetails.push(`${get('proportion_details')} proportions`);
  if (get('pose_and_attitude')) characterDetails.push(`${get('pose_and_attitude')} pose`);
  if (characterDetails.length > 0) {
    parts.push(`Character: ${characterDetails.join(', ')}.`);
  }

  const costumeDetails = [];
  if (get('costume_type')) costumeDetails.push(`${get('costume_type')} costume`);
  if (get('costume_description')) costumeDetails.push(`${get('costume_description')}`);
  if (get('accessory_detail')) costumeDetails.push(`${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) costumeDetails.push(`inspired by ${get('animal_or_theme_inspiration')}`);
  if (costumeDetails.length > 0) {
    parts.push(`Costume: ${costumeDetails.join(', ')}.`);
  }

  const legDetails = [];
  if (get('leg_shape')) legDetails.push(`${get('leg_shape')} legs`);
  if (get('footwear')) legDetails.push(`${get('footwear')}`);
  if (legDetails.length > 0) {
    parts.push(`Legs: ${legDetails.join(', ')}.`);
  }

  const faceDetails = [];
  if (get('hair_style')) faceDetails.push(`${get('hair_style')} hair`);
  if (get('face_features')) faceDetails.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) faceDetails.push(`${get('emotion_or_attitude')} expression`);
  if (faceDetails.length > 0) {
    parts.push(`Face: ${faceDetails.join(', ')}.`);
  }

  const materialDetails = [];
  const materials = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  if (materials.length > 0) {
    materialDetails.push(materials.join(', '));
  }
  if (get('surface_feel')) {
    materialDetails.push(`${get('surface_feel')} feel`);
  }
  if (materialDetails.length > 0) {
    parts.push(`Materials: ${materialDetails.join(', ')}.`);
  }

  const environmentDetails = [];
  if (get('background_type')) environmentDetails.push(`${get('background_type')} background`);
  if (get('lighting_style')) environmentDetails.push(`${get('lighting_style')} lighting`);
  if (environmentDetails.length > 0) {
    parts.push(`Environment: ${environmentDetails.join(', ')}.`);
  }

  if (get('application_context')) {
    parts.push(`Context: ${get('application_context')}.`);
  }

  return parts.filter(Boolean).join(' ');
};