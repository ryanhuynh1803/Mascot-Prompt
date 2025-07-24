import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { presets, Preset } from "@/data/presets";
import { PromptOptions } from "@/types/mascot";
import { useToast } from "@/components/ui/use-toast";

interface PresetSelectorProps {
  onApplyPreset: (preset: Partial<PromptOptions>) => void;
}

export const PresetSelector = ({ onApplyPreset }: PresetSelectorProps) => {
  const { toast } = useToast();

  const handleSelectPreset = (preset: Preset) => {
    onApplyPreset(preset.options);
    toast({
      title: "Đã áp dụng mẫu!",
      description: `Mẫu "${preset.name}" đã được áp dụng thành công.`,
    });
  };

  return (
    <Card className="border-2 bg-card transition-colors rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Mẫu có sẵn
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chọn một mẫu để áp dụng các tùy chọn đã định sẵn.
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="grid grid-cols-1 gap-4">
            {presets.map((preset) => (
              <div 
                key={preset.id} 
                className="flex items-center gap-4 p-3 border rounded-md bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleSelectPreset(preset)}
              >
                {preset.imageUrl && (
                  <img 
                    src={preset.imageUrl} 
                    alt={preset.name} 
                    className="w-16 h-16 object-cover rounded-md border border-muted-foreground/20" 
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{preset.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{preset.description}</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); handleSelectPreset(preset); }}
                  className="shrink-0 rounded-md"
                >
                  Áp dụng
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};