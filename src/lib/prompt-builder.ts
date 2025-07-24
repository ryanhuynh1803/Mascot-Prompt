import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  let prompt = "";
  const get = (key: keyof PromptOptions) => options[key]?.trim();

  // 1. Character Core
  const characterCoreParts = [];
  if (get('art_style')) characterCoreParts.push(`${get('art_style')} style`);
  if (get('age_gender_personality')) characterCoreParts.push(`${get('age_gender_personality')} character`);
  if (get('design_theme')) characterCoreParts.push(`in a ${get('design_theme')} theme`);

  if (characterCoreParts.length > 0) {
    prompt += `A 3D mascot, ${characterCoreParts.join(', ')}. `;
  } else {
    prompt += `A 3D mascot. `;
  }

  // 2. Body and Pose
  const bodyAndPoseParts = [];
  if (get('body_shape')) bodyAndPoseParts.push(`${get('body_shape')} body shape`);
  if (get('proportion_details')) bodyAndPoseParts.push(`${get('proportion_details')} proportions`);
  if (get('pose_and_attitude')) bodyAndPoseParts.push(`${get('pose_and_attitude')} pose`);

  if (bodyAndPoseParts.length > 0) {
    prompt += `It has ${bodyAndPoseParts.join(' and ')}. `;
  }

  // 3. Costume
  const costumeDetailsParts = [];
  if (get('costume_type')) costumeDetailsParts.push(`${get('costume_type')} costume`);
  if (get('costume_description')) costumeDetailsParts.push(`${get('costume_description')}`);
  if (get('accessory_detail')) costumeDetailsParts.push(`with ${get('accessory_detail')}`);
  if (get('animal_or_theme_inspiration')) costumeDetailsParts.push(`inspired by ${get('animal_or_theme_inspiration')}`);

  if (costumeDetailsParts.length > 0) {
    prompt += `The mascot is wearing ${costumeDetailsParts.join(', ')}. `;
  }

  // 4. Legs and Footwear
  const legDetailsParts = [];
  if (get('leg_shape')) legDetailsParts.push(`${get('leg_shape')} legs`);
  if (get('footwear')) legDetailsParts.push(`${get('footwear')}`);

  if (legDetailsParts.length > 0) {
    prompt += `It features ${legDetailsParts.join(' and ')}. `;
  }

  // 5. Face
  const faceDetailsParts = [];
  if (get('hair_style')) faceDetailsParts.push(`${get('hair_style')} hair`);
  if (get('face_features')) faceDetailsParts.push(`${get('face_features')}`);
  if (get('emotion_or_attitude')) faceDetailsParts.push(`${get('emotion_or_attitude')} expression`);

  if (faceDetailsParts.length > 0) {
    prompt += `Its face has ${faceDetailsParts.join(', ')}. `;
  }

  // 6. Materials
  const materialsParts = [get('material_1'), get('material_2'), get('material_3')].filter(Boolean);
  let materialSentence = '';
  if (materialsParts.length > 0) {
    materialSentence += `It is made of ${materialsParts.join(', ')}`;
  }
  if (get('surface_feel')) {
    if (materialSentence) {
      materialSentence += ` and has a ${get('surface_feel')} surface feel. `;
    } else {
      materialSentence += `It has a ${get('surface_feel')} surface feel. `;
    }
  }
  if (materialSentence) {
    prompt += materialSentence;
  }

  // 7. Environment
  const environmentDetailsParts = [];
  if (get('lighting_style')) environmentDetailsParts.push(`${get('lighting_style')} lighting`);
  if (get('background_type')) environmentDetailsParts.push(`${get('background_type')} background`);

  if (environmentDetailsParts.length > 0) {
    prompt += `The scene is set under ${environmentDetailsParts.join(' and ')}. `;
  }

  // 8. Context
  if (get('application_context')) {
    prompt += `This mascot is suitable for ${get('application_context')}.`;
  }

  // Clean up extra spaces and periods
  return prompt.replace(/\s+/g, ' ').trim();
};