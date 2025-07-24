import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const sentences: string[] = [];
  const get = (key: keyof PromptOptions) => options[key]?.trim();

  // Sentence 1: Main command and character core
  const characterCoreParts = [];
  if (get('art_style')) characterCoreParts.push(`${get('art_style')} style`);
  if (get('age_gender_personality')) characterCoreParts.push(`a ${get('age_gender_personality')} character`);
  if (get('design_theme')) characterCoreParts.push(`in a ${get('design_theme')} theme`);
  if (get('species')) characterCoreParts.push(`a ${get('species')} species`); // Added species here

  if (characterCoreParts.length > 0) {
    sentences.push(`Generate a 3D mascot. Character is rendered in a ${characterCoreParts.join(', ')}.`);
  } else {
    sentences.push("Generate a 3D mascot.");
  }

  // Sentence 2: Body, Pose, and Action
  const bodyPoseActionDetails = [];
  if (get('body_shape')) bodyPoseActionDetails.push(`a ${get('body_shape')} body shape`);
  if (get('proportion_details')) bodyPoseActionDetails.push(`${get('proportion_details')} proportions`);
  if (get('pose_and_attitude')) bodyPoseActionDetails.push(`a ${get('pose_and_attitude')} pose`);
  if (get('action')) bodyPoseActionDetails.push(`and is ${get('action')}`);

  if (bodyPoseActionDetails.length > 0) {
    sentences.push(`Character features ${bodyPoseActionDetails.join(' and ')}.`);
  }

  // Sentence 3: Costume
  const costumeDetails = [];
  if (get('costume_type')) costumeDetails.push(`${get('costume_type')} costume`);
  if (get('costume_description')) costumeDetails.push(`${get('costume_description')}`);
  if (get('accessory_detail')) costumeDetails.push(`with ${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) costumeDetails.push(`inspired by ${get('animal_or_theme_inspiration')}`);
  if (costumeDetails.length > 0) {
    sentences.push(`Character is wearing a ${costumeDetails.join(', ')}.`);
  }

  // Sentence 4: Legs and Footwear
  const legDetails = [];
  if (get('leg_shape')) legDetails.push(`${get('leg_shape')} legs`);
  if (get('footwear')) legDetails.push(`${get('footwear')}`);
  if (legDetails.length > 0) {
    sentences.push(`Character has ${legDetails.join(' and ')}.`);
  }

  // Sentence 5: Face
  const faceDetails = [];
  if (get('hair_style')) faceDetails.push(`${get('hair_style')} hair`);
  if (get('face_features')) faceDetails.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) faceDetails.push(`an ${get('emotion_or_attitude')} expression`);
  if (faceDetails.length > 0) {
    sentences.push(`Character showcases ${faceDetails.join(', ')}.`);
  }

  // Sentence 6: Materials
  const materials = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  let materialSentenceParts: string[] = [];

  if (materials.length > 0) {
    materialSentenceParts.push(`composed of ${materials.join(', ')}`);
  }
  if (get('surface_feel')) {
    materialSentenceParts.push(`offering a ${get('surface_feel')} tactile experience`);
  }

  if (materialSentenceParts.length > 0) {
    sentences.push(`Character is ${materialSentenceParts.join(' and ')}.`);
  }

  // Sentence 7: Environment and Viewpoint
  const environmentDetails = [];
  if (get('background_type')) environmentDetails.push(`${get('background_type')} background`);
  if (get('lighting_style')) environmentDetails.push(`illuminated by ${get('lighting_style')} lighting`);
  if (environmentDetails.length > 0) {
    sentences.push(`Character is set against a ${environmentDetails.join(' and ')}.`);
  }
  if (get('viewpoint')) {
    sentences.push(`Rendered from a ${get('viewpoint')}.`);
  }

  // Sentence 8: Context
  if (get('application_context')) {
    sentences.push(`Character is ideal for ${get('application_context')}.`);
  }

  // Join all sentences with a space.
  return sentences.filter(Boolean).join(' ');
};