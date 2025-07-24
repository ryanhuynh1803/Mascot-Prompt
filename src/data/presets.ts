import { PromptOptions } from "@/types/mascot";

export interface Preset {
  id: string;
  name: string;
  description: string;
  options: Partial<PromptOptions>;
  imageUrl?: string;
}

export const presets: Preset[] = [
  {
    id: "dinosaur-boy",
    name: "Cậu bé khủng long",
    description: "Một cậu bé chibi cáu kỉnh trong bộ đồ khủng long đáng yêu, phong cách truyện tranh.",
    imageUrl: "https://i.pinimg.com/1200x/ce/31/a8/ce31a87217b46a9981ffa7c2d4dd9c50.jpg",
    options: {
      art_style: "Chibi",
      age_gender_personality: "young, friendly, curious", 
      costume_type: "animal costume",
      design_theme: "Storybook",
      body_shape: "round and soft",
      proportion_details: "oversized head, small body",
      pose_and_attitude: "standing, waving cheerfully", 
      costume_description: "colorful and whimsical, with oversized buttons", 
      accessory_detail: "", 
      animal_or_theme_inspiration: "a mystical dragon", 
      hair_style: "short and spiky",
      face_features: "large, expressive eyes and a wide smile", 
      emotion_or_attitude: "grumpy but lovable",
      material_1: "felt",
      material_2: "fabric",
      material_3: "smooth fabric",
      surface_feel: "soft and plush",
      lighting_style: "soft studio lighting",
      background_type: "minimalist gradient",
      application_context: "gaming character", 
    },
  },
];