import { memo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PromptOptions, bodyPartOptions } from '@/types/mascot';
import { optionChoices } from '@/data/optionChoices';
import { translations, optionKeyTranslations } from '@/data/translations';
import { ColorPicker } from './ColorPicker';

interface MascotOptionControlProps {
  optionKey: keyof PromptOptions;
  value: string | undefined;
  onOptionChange: (key: keyof PromptOptions, value: string) => void;
}

const colorOptionKeys = bodyPartOptions.colors;

const MascotOptionControl = ({ optionKey, value, onOptionChange }: MascotOptionControlProps) => {
  const isColorOption = colorOptionKeys.includes(optionKey);
  const label = optionKeyTranslations[optionKey] || optionKey;

  if (isColorOption) {
    return (
      <ColorPicker
        id={optionKey}
        label={label}
        value={value || ''}
        onValueChange={(newValue) => onOptionChange(optionKey, newValue)}
      />
    );
  }

  const choices = optionChoices[optionKey as keyof typeof optionChoices] || [];
  const choiceTranslations = translations[optionKey as keyof typeof translations] as Record<string, string> | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={optionKey}>{label}</Label>
      <Select
        value={value}
        onValueChange={(newValue) => onOptionChange(optionKey, newValue)}
      >
        <SelectTrigger id={optionKey}>
          <SelectValue placeholder="Tự đề xuất" />
        </SelectTrigger>
        <SelectContent>
          {choices.map((choice) => (
            <SelectItem key={choice} value={choice}>
              {choiceTranslations?.[choice] || choice}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default memo(MascotOptionControl);