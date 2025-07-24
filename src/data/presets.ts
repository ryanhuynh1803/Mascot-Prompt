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
    id: "template-1",
    name: "Mẫu 1", // Simplified name
    description: "", // Removed description
    options: {
      art_style: "Chibi",
      age_gender_personality: "young, moody boy",
      costume_type: "animal costume",
      design_theme: "whimsical fairytale",
      body_shape: "petite",
      proportion_details: "oversized head, small body",
      pose_and_attitude: "standing, hands in pockets, unimpressed",
      costume_description: "green dinosaur hoodie, soft textures, pink spikes, long tail, dragon-like hood",
      accessory_detail: "", 
      animal_or_theme_inspiration: "a mystical dragon", 
      hair_style: "grayish-brown, peeking from under hood",
      face_features: "pouty cheeks, blushing skin, large cartoon eyes, narrowed eyes, furrowed brows",
      emotion_or_attitude: "grumpy but lovable", 
      material_1: "plush", 
      material_2: "fabric",
      material_3: "", 
      surface_feel: "soft and plush",
      lighting_style: "soft studio lighting", 
      background_type: "clean soft pastel green background",
      application_context: "character merchandise, animated storybooks, collectible vinyl figures",
      leg_shape: "short and stubby", 
      footwear: "simple sneakers", 
    },
    imageUrl: "/images/cau-be-khung-long.png", // Updated image URL
  },
];