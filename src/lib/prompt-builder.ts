import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  let promptParts: string[] = [];
  const get = (key: keyof PromptOptions) => options[key]?.trim();

  // 1. Character Core
  const characterDescription = [];
  if (get('art_style')) characterDescription.push(`${get('art_style')} style`);
  if (get('age_gender_personality')) characterDescription.push(`${get('age_gender_personality')} character`);
  if (get('design_theme')) characterDescription.push(`in a ${get('design_theme')} theme`);

  if (characterDescription.length > 0) {
    promptParts.push(`A 3D mascot, rendered in a ${characterDescription.join(', ')}.`);
  } else {
    promptParts.push(`A 3D mascot.`);
  }

  // 2. Body and Pose
  const bodyAndPoseDetails = [];
  if (get('body_shape')) bodyAndPoseDetails.push(`a ${get('body_shape')} body shape`);
  if (get('proportion_details')) bodyAndPoseDetails.push(`${get('proportion_details')} proportions`);
  if (get('pose_and_attitude')) bodyAndPoseDetails.push(`a ${get('pose_and_attitude')} pose`);

  if (bodyAndPoseDetails.length > 0) {
    promptParts.push(`It features ${bodyAndPoseDetails.join(' and ')}.`);
  }

  // 3. Costume
  const costumeDetails = [];
  if (get('costume_type')) costumeDetails.push(`${get('costume_type')} costume`);
  if (get('costume_description')) costumeDetails.push(`${get('costume_description')}`);
  if (get('accessory_detail')) costumeDetails.push(`with ${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) costumeDetails.push(`inspired by ${get('animal_or_theme_inspiration')}`);

  if (costumeDetails.length > 0) {
    promptParts.push(`The mascot is adorned in a ${costumeDetails.join(', ')}.`);
  }

  // 4. Legs and Footwear
  const legDetails = [];
  if (get('leg_shape')) legDetails.push(`${get('leg_shape')} legs`);
  if (get('footwear')) legDetails.push(`${get('footwear')}`);

  if (legDetails.length > 0) {
    promptParts.push(`Its lower body has ${legDetails.join(' and ')}.`);
  }

  // 5. Face
  const faceDetails = [];
  if (get('hair_style')) faceDetails.push(`${get('hair_style')} hair`);
  if (get('face_features')) faceDetails.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) faceDetails.push(`an ${get('emotion_or_attitude')} expression`);

  if (faceDetails.length > 0) {
    promptParts.push(`The face showcases ${faceDetails.join(', ')}.`);
  }

  // 6. Materials
  const materials = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  let materialSentence = '';
  if (materials.length > 0) {
    materialSentence += `It is primarily composed of ${materials.join(', ')}`;
  }
  if (get('surface_feel')) {
    if (materialSentence) {
      materialSentence += ` and offers a ${get('surface_feel')} tactile experience.`;
    } else {
      materialSentence += `It offers a ${get('surface_feel')} tactile experience.`;
    }
  }
  if (materialSentence) {
    promptParts.push(materialSentence);
  }

  // 7. Environment
  const environmentDetails = [];
  if (get('lighting_style')) environmentDetails.push(`${get('lighting_style')} lighting`);
  if (get('background_type')) environmentDetails.push(`${get('background_type')} background`);

  if (environmentDetails.length > 0) {
    promptParts.push(`The scene is illuminated by ${environmentDetails.join(' against a ')}.`);
  }

  // 8. Context
  if (get('application_context')) {
    promptParts.push(`This mascot is suitable for ${get('application_context')}.`);
  }

  // Join all parts into a single paragraph
  return promptParts.join(' ').trim();
};