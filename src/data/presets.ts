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
      viewpoint: "front view", // Added
      action: "standing", // Added
      species: "humanoid", // Added
    },
    imageUrl: "/images/cau-be-khung-long.png", // Updated image URL
  },
  {
    id: "template-2",
    name: "Mẫu 2",
    description: "",
    options: {
      art_style: "Chibi",
      age_gender_personality: "cute, ceremonial",
      design_theme: "traditional Chinese",
      body_shape: "round and soft",
      proportion_details: "very large round head, small short body, 1:3 head-to-body ratio, soft rounded limbs, no visible joints",
      pose_and_attitude: "standing",
      accessory_detail: "a red decorative collar with a geometric Chinese pattern and a small golden bell in the center",
      animal_or_theme_inspiration: "a Chinese lion",
      hair_style: "swirly orange mane",
      face_features: "spiral cheek markings, tiny fangs, curly eyebrows",
      emotion_or_attitude: "playful",
      material_1: "soft vinyl",
      material_3: "glossy enamel",
      surface_feel: "smooth and glossy",
      lighting_style: "soft studio lighting",
      background_type: "soft pastel background",
      application_context: "collectible toy figures, Lunar New Year mascots",
      leg_shape: "short and stubby",
      footwear: "barefoot",
      viewpoint: "front view", // Added
      action: "standing", // Added
      species: "animal", // Added
    },
    imageUrl: "/images/chinese-lion-mascot.png",
  },
  {
    id: "template-3",
    name: "Mẫu 3",
    description: "",
    options: {
      art_style: "Cartoonish",
      age_gender_personality: "young, confident, fashionable boy",
      costume_type: "streetwear outfit",
      design_theme: "urban street art",
      body_shape: "tall and slender",
      proportion_details: "oversized head, small body",
      pose_and_attitude: "dynamic walking pose, confident and expressive",
      costume_description: "white striped button-up shirt layered over a white t-shirt, bright blue sweater tied casually around the neck, distressed ripped jeans in deep blue with frayed holes at knees and thighs, rolled cuffs",
      accessory_detail: "light grey bucket hat with a minimal brand patch, oversized square sunglasses, small smiley face badge, 'NEW RESEARCH' label tag, a black wristband, a dark blue messenger bag",
      animal_or_theme_inspiration: "",
      hair_style: "short and neat",
      face_features: "open mouth, curious expression",
      emotion_or_attitude: "confident and expressive",
      material_1: "smooth plastic",
      material_2: "clay",
      material_3: "",
      surface_feel: "smooth and tactile",
      lighting_style: "soft studio lighting",
      background_type: "solid pastel pink background",
      application_context: "youth branding, 3D avatars, digital fashion showcases",
      leg_shape: "athletic and strong",
      footwear: "stylish high-top white sneakers with visible socks",
      viewpoint: "front view",
      action: "walking",
      species: "humanoid",
    },
    imageUrl: "/images/boy-streetwear-mascot.png",
  },
];