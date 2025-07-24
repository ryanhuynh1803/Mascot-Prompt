import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { presets, Preset } from "@/data/presets";
import { useToast } from "@/components/ui/use-toast";
// Button is no longer needed here as the whole div becomes clickable

interface PresetSelectorProps {
  onApplyPreset: (preset: Preset) => void;
}

export const PresetSelector = ({ onApplyPreset }: PresetSelectorProps) => {
  const { toast } = useToast();

  const handleSelectPreset = (preset: Preset) => {
    onApplyPreset(preset);
    toast({
      title: "Đã áp dụng mẫu!",
      description: `Mẫu "${preset.name}" đã được áp dụng thành công.`,
    });
  };

  return (
    <Card className="bg-card transition-colors rounded-lg shadow-none"> {/* Removed border-2 and added shadow-none */}
      <CardHeader className="hidden"> {/* Hidden CardHeader */}
        <CardTitle className="flex items-center gap-2">
          Mẫu có sẵn
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chọn một mẫu để áp dụng các tùy chọn đã định sẵn.
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4">
            {presets.map((preset) => (
              <div 
                key={preset.id} 
                className="flex items-center gap-4 p-3 rounded-md bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer shrink-0 w-[280px]" // Removed border
                onClick={() => handleSelectPreset(preset)}
              >
                {preset.imageUrl && (
                  <img 
                    src={preset.imageUrl} 
                    alt={preset.name} 
                    className="w-16 h-16 object-cover rounded-md" // Removed border from image
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{preset.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{preset.description}</p>
                </div>
                {/* Removed the Button component */}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};