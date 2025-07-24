import { useState, useCallback } from 'react';
import { BodyPart, PromptOptions, defaultOptions, bodyPartsOrder, bodyPartOptions } from '@/types/mascot';
import { optionChoices } from '@/data/optionChoices';
import { useToast } from '@/hooks/use-toast';

export const useMascotConfig = () => {
  const { toast } = useToast();

  // Luôn bắt đầu với trạng thái mặc định, bỏ qua localStorage
  const [options, setOptions] = useState<Partial<PromptOptions>>(defaultOptions);

  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('character');

  const updateOption = useCallback((key: keyof PromptOptions, value: string) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleReset = useCallback(() => {
    setOptions(defaultOptions);
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
    setOptions,
  };
};