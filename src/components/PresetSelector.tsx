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
        <ScrollArea className="w-full whitespace-nowrap pb-4"> {/* Changed to horizontal scroll */}
          <div className="flex gap-4"> {/* Changed to flex for horizontal layout */}
            {presets.map((preset) => (
              <div 
                key={preset.id} 
                className="flex items-center gap-4 p-3 border rounded-md bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer shrink-0 w-[280px]" // Added shrink-0 and fixed width
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
          <ScrollBar orientation="horizontal" /> {/* Horizontal scrollbar */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};