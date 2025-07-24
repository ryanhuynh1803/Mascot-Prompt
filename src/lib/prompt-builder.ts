import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const parts: string[] = [];

  const get = (key: keyof PromptOptions) => options[key]?.trim();

  // Character
  const characterDetails = [];
  if (get('art_style')) characterDetails.push(`a 3D ${get('art_style')} character`);
  if (get('age_gender_personality')) characterDetails.push(`of a ${get('age_gender_personality')}`);
  if (get('costume_type')) characterDetails.push(`wearing a ${get('costume_type')}`);
  if (get('design_theme')) characterDetails.push(`in a ${get('design_theme')} style`);
  if (characterDetails.length > 0) {
    parts.push(`Create ${characterDetails.join(' ')}.`);
  }

  const bodyDetails = [];
  if (get('body_shape')) bodyDetails.push(`The character has a ${get('body_shape')}`);
  if (get('proportion_details')) bodyDetails.push(`with ${get('proportion_details')}`);
  if (get('pose_and_attitude')) bodyDetails.push(`standing in a ${get('pose_and_attitude')}`);
  if (bodyDetails.length > 0) {
    parts.push(bodyDetails.join(' ') + '.');
  }

  // Costume
  const costumeDetails = [];
  if (get('costume_description')) costumeDetails.push(`The costume features ${get('costume_description')}`);
  if (get('accessory_detail')) costumeDetails.push(`including ${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) costumeDetails.push(`inspired by a ${get('animal_or_theme_inspiration')}`);
  if (costumeDetails.length > 0) {
    parts.push(costumeDetails.join(', ') + '.');
  }

  // Face
  const faceDetails = [];
  if (get('hair_style')) faceDetails.push(`${get('hair_style')}`);
  if (get('face_features')) faceDetails.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) faceDetails.push(`an expression that feels ${get('emotion_or_attitude')}`);
  if (faceDetails.length > 0) {
    parts.push(`The face includes ${faceDetails.join(' and ')}.`);
  }

  // Materials
  const materials = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  if (materials.length > 0) {
    let materialString = `Use materials such as ${materials.join(', ')}`;
    if (get('surface_feel')) {
      materialString += ` to achieve a ${get('surface_feel')}`;
    }
    parts.push(materialString + '.');
  }

  // Environment
  const environmentDetails = [];
  if (get('lighting_style')) environmentDetails.push(`Apply ${get('lighting_style')}`);
  if (get('background_type')) environmentDetails.push(`and render on a ${get('background_type')}`);
  if (environmentDetails.length > 0) {
    parts.push(environmentDetails.join(' ') + ' to complete the look.');
  }

  // Context
  if (get('application_context')) {
    parts.push(`This character is designed for ${get('application_context')}.`);
  }

  return parts.join('\n\n');
};