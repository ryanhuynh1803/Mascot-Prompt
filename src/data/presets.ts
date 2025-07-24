import { PromptOptions } from "@/types/mascot";

export interface Preset {
  id: string;
  name: string;
  description: string;
  options: Partial<PromptOptions>;
  imageUrl?: string;
}

export const presets: Preset[] = [
  // Danh sách mẫu hiện đang trống
];