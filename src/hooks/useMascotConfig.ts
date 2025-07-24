import { useState, useCallback } from 'react';
import { BodyPart, PromptOptions, defaultOptions, bodyPartsOrder, bodyPartOptions } from '@/types/mascot';
import { optionChoices } from '@/data/optionChoices';
import { useToast } from '@/hooks/use-toast';
import { presets } from '@/data/presets'; // Import presets

export const useMascotConfig = () => {
  const { toast } = useToast();

  const [options, setOptions] = useState<Partial<PromptOptions>>(defaultOptions);
  // Initialize with the first preset's image, or a default placeholder if no presets
  const [mascotImageUrl, setMascotImageUrl] = useState<string>(presets[0]?.imageUrl || "https://i.pinimg.com/1200x/ce/31/a8/ce31a87217b46a9981ffa7c2d4dd9c50.jpg");

  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('character');

  const updateOption = useCallback((key: keyof PromptOptions, value: string) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleReset = useCallback(() => {
    setOptions(defaultOptions);
    setMascotImageUrl(presets[0]?.imageUrl || "https://i.pinimg.com/1200x/ce/31/a8/ce31a87217b46a9981ffa7c2d4dd9c50.jpg"); // Reset image to default preset image
    setSelectedBodyPart('character');
    toast({
      title: "Đã làm mới!",
      description: "Tất cả lựa chọn đã được trả về mặc định.",
    });
  }, [toast]);

  const handleRandom = useCallback(() => {
    const randomOptions: Partial<PromptOptions> = {};
    for (const key in optionChoices) {
      const typedKey = key as keyof typeof optionChoices;
      const choices = optionChoices[typedKey];
      if (choices.length > 0) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        randomOptions[typedKey as keyof PromptOptions] = choices[randomIndex];
      }
    }
    setOptions(randomOptions);
    // Do not change image on random, only on preset apply
    toast({
      title: "Lựa chọn ngẫu nhiên đã được áp dụng!",
      description: "Hãy khám phá kết quả bất ngờ.",
    });
  }, [toast]);

  const handleBodyPartSelect = useCallback((part: BodyPart) => {
    setSelectedBodyPart(part);
  }, []);

  const handleNextPart = useCallback(() => {
    const currentIndex = bodyPartsOrder.indexOf(selectedBodyPart);
    const nextIndex = (currentIndex + 1) % bodyPartsOrder.length;
    setSelectedBodyPart(bodyPartsOrder[nextIndex]);
  }, [selectedBodyPart]);

  const handlePreviousPart = useCallback(() => {
    const currentIndex = bodyPartsOrder.indexOf(selectedBodyPart);
    const prevIndex = (currentIndex - 1 + bodyPartsOrder.length) % bodyPartsOrder.length;
    setSelectedBodyPart(bodyPartsOrder[prevIndex]);
  }, [selectedBodyPart]);

  const applyPreset = useCallback((presetOptions: Partial<PromptOptions>, imageUrl?: string) => {
    setOptions(presetOptions); // Overwrite with preset options
    if (imageUrl) {
      setMascotImageUrl(imageUrl);
    }
  }, []);

  const currentPage = bodyPartsOrder.indexOf(selectedBodyPart) + 1;
  const totalPages = bodyPartsOrder.length;

  return {
    options,
    selectedBodyPart,
    updateOption,
    handleReset,
    handleRandom,
    handleBodyPartSelect,
    handleNextPart,
    handlePreviousPart,
    currentPage,
    totalPages,
    applyPreset, // New function to apply preset
    mascotImageUrl, // New state for image URL
  };
};