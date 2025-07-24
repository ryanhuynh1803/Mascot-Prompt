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
    imageUrl: "https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-ea58-61f7-9aa0-8469b2cad4d6/raw?se=2025-07-24T19%3A32%3A10Z&sp=r&sv=2024-08-04&sr=b&scid=b26b437f-1517-55f1-b2f6-446435b54aa2&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-23T20%3A08%3A36Z&ske=2025-07-24T20%3A08%3A36Z&sks=b&skv=2024-08-04&sig=MBRqvE5m2sQ2FUCxnQrXolB4ih3FrnZCOvMU5cU6w/k%3D",
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
  {
    id: "dinosaur-girl",
    name: "Cô bé khủng long",
    description: "Một cô bé chibi cáu kỉnh trong bộ đồ khủng long đáng yêu, phong cách truyện tranh.",
    imageUrl: "https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-ea58-61f7-9aa0-8469b2cad4d6/raw?se=2025-07-24T19%3A32%3A10Z&sp=r&sv=2024-08-04&sr=b&scid=b26b437f-1517-55f1-b2f6-446435b54aa2&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-23T20%3A08%3A36Z&ske=2025-07-24T20%3A08%3A36Z&sks=b&skv=2024-08-04&sig=MBRqvE5m2sQ2FUCxnQrXolB4ih3FrnZCOvMU5cU6w/k%3D", // Changed to match dinosaur-boy image
    options: {
      art_style: "Chibi",
      age_gender_personality: "young, friendly, curious", 
      costume_type: "animal costume",
      design_theme: "Storybook",
      body_shape: "round and soft",
      proportion_details: "oversized head, small body",
      pose_and_attitude: "standing, hands in pockets, unimpressed", 
      costume_description: "green dinosaur hoodie, soft textures, pink spikes, long tail, dragon-like hood", 
      accessory_detail: "", 
      animal_or_theme_inspiration: "a mystical dragon", 
      hair_style: "grayish-brown, peeking from under hood",
      face_features: "pouty cheeks, blushing skin, large cartoon eyes, narrowed eyes, furrowed brows", 
      emotion_or_attitude: "grumpy but lovable",
      material_1: "felt",
      material_2: "fabric",
      material_3: "smooth fabric",
      surface_feel: "soft and plush",
      lighting_style: "soft studio lighting",
      background_type: "clean soft pastel green background",
      application_context: "character merchandise, animated storybooks, collectible vinyl figures", 
    },
  },
];