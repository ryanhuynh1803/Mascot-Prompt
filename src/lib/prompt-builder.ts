import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const get = (key: keyof PromptOptions) => options[key] || "none";
  
  return `Create a 3D ${get('art_style')} character of a ${get('age_gender_personality')} wearing a ${get('costume_type')} in a ${get('design_theme')} style.
The character has a ${get('body_shape')} with ${get('proportion_details')}, standing in a ${get('pose_and_attitude')}.

The costume features ${get('costume_description')}, including ${get('accessory_detail')}, inspired by a ${get('animal_or_theme_inspiration')}.

The face includes ${get('hair_style')}, ${get('face_features')}, and an expression that feels ${get('emotion_or_attitude')}.

Use materials such as ${get('material_1')}, ${get('material_2')}, and ${get('material_3')} to achieve a ${get('surface_feel')}.
Apply ${get('lighting_style')} and render on a ${get('background_type')} to complete the look.

This character is designed for ${get('application_context')}.`;
};