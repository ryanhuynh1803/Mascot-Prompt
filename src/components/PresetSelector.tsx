import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { presets, Preset } from "@/data/presets";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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
    <Card className="bg-card transition-colors rounded-lg border-none">
      <CardHeader className="hidden">
        <CardTitle className="flex items-center gap-2">
          Mẫu có sẵn
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chọn một mẫu để áp dụng các tùy chọn đã định sẵn.
        </p>
      </CardHeader>
      <CardContent className="px-6 py-4"> {/* Adjusted padding for CardContent */}
        <ScrollArea className="w-full whitespace-nowrap"> {/* Removed pb-4 from ScrollArea */}
          <div className="flex gap-4">
            {presets.map((preset) => (
              <Button
                key={preset.id} 
                onClick={() => handleSelectPreset(preset)}
                className="flex items-center gap-3 p-2 rounded-md bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer shrink-0 w-[220px] h-auto justify-start text-left" // Reduced width to w-[220px] and padding to p-2
                variant="ghost"
              >
                {preset.imageUrl && (
                  <img 
                    src={preset.imageUrl} 
                    alt={preset.name} 
                    className="w-14 h-14 object-cover rounded-md" // Reduced image size to w-14 h-14
                  />
                )}
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-semibold text-foreground truncate">{preset.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{preset.description}</p>
                </div>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};