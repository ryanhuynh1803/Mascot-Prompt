import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const parts: string[] = [];
  const get = (key: keyof PromptOptions) => options[key]?.trim();

  // Start with the main command
  parts.push("Generate a 3D mascot");

  // Character Core
  const characterDetails = [];
  if (get('art_style')) characterDetails.push(`${get('art_style')} style`);
  if (get('age_gender_personality')) characterDetails.push(`a ${get('age_gender_personality')} character`);
  if (get('design_theme')) characterDetails.push(`in a ${get('design_theme')} theme`);
  if (characterDetails.length > 0) {
    parts.push(`rendered in a ${characterDetails.join(', ')}`);
  }

  // Body and Pose
  const bodyAndPoseDetails = [];
  if (get('body_shape')) bodyAndPoseDetails.push(`a ${get('body_shape')} body shape`);
  if (get('proportion_details')) bodyAndPoseDetails.push(`${get('proportion_details')} proportions`);
  if (get('pose_and_attitude')) bodyAndPoseDetails.push(`a ${get('pose_and_attitude')} pose`);
  if (bodyAndPoseDetails.length > 0) {
    parts.push(`featuring ${bodyAndPoseDetails.join(' and ')}`);
  }

  // Costume
  const costumeDetails = [];
  if (get('costume_type')) costumeDetails.push(`${get('costume_type')} costume`);
  if (get('costume_description')) costumeDetails.push(`${get('costume_description')}`);
  if (get('accessory_detail')) costumeDetails.push(`with ${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) costumeDetails.push(`inspired by ${get('animal_or_theme_inspiration')}`);
  if (costumeDetails.length > 0) {
    parts.push(`wearing a ${costumeDetails.join(', ')}`);
  }

  // Legs and Footwear
  const legDetails = [];
  if (get('leg_shape')) legDetails.push(`${get('leg_shape')} legs`);
  if (get('footwear')) legDetails.push(`${get('footwear')}`);
  if (legDetails.length > 0) {
    parts.push(`with ${legDetails.join(' and ')}`);
  }

  // Face
  const faceDetails = [];
  if (get('hair_style')) faceDetails.push(`${get('hair_style')} hair`);
  if (get('face_features')) faceDetails.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) faceDetails.push(`an ${get('emotion_or_attitude')} expression`);
  if (faceDetails.length > 0) {
    parts.push(`showcasing ${faceDetails.join(', ')}`);
  }

  // Materials
  const materials = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  let materialPhrase = '';
  if (materials.length > 0) {
    materialPhrase += `composed of ${materials.join(', ')}`;
  }
  if (get('surface_feel')) {
    if (materialPhrase) {
      materialPhrase += ` and offering a ${get('surface_feel')} tactile experience`;
    } else {
      materialPhrase += `offering a ${get('surface_feel')} tactile experience`;
    }
  }
  if (materialPhrase) {
    parts.push(materialPhrase);
  }

  // Environment
  const environmentDetails = [];
  if (get('background_type')) environmentDetails.push(`${get('background_type')} background`);
  if (get('lighting_style')) environmentDetails.push(`illuminated by ${get('lighting_style')} lighting`);
  if (environmentDetails.length > 0) {
    parts.push(`set against a ${environmentDetails.join(' and ')}`);
  }

  // Context
  if (get('application_context')) {
    parts.push(`ideal for ${get('application_context')}`);
  }

  // Join all parts with commas, and add a period at the end.
  // This will create a single, long, descriptive sentence.
  return parts.filter(Boolean).join(', ') + '.';
};