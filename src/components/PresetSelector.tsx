import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { presets, Preset } from "@/data/presets";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"; // Ensure Button is imported

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
    <Card className="bg-card transition-colors rounded-lg"> {/* Removed border-2 */}
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
              <Button // Changed from div to Button
                key={preset.id} 
                onClick={() => handleSelectPreset(preset)}
                // Apply previous div classes to Button, and add button-specific styles
                className="flex items-center gap-4 p-3 rounded-md bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer shrink-0 w-[280px] h-auto justify-start text-left" 
                variant="ghost" // Use ghost variant as a base, then override with custom classes
              >
                {preset.imageUrl && (
                  <img 
                    src={preset.imageUrl} 
                    alt={preset.name} 
                    className="w-16 h-16 object-cover rounded-md" // Removed border
                  />
                )}
                <div className="flex-1 overflow-hidden"> {/* Added overflow-hidden to ensure text stays within bounds */}
                  <h3 className="font-semibold text-foreground truncate">{preset.name}</h3> {/* Added truncate */}
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