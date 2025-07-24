import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { presets } from "@/data/presets";

export const LandingPagePresetCarousel = () => {
  const navigate = useNavigate();

  const handleSelectPreset = (presetId: string) => {
    navigate(`/generator?presetId=${presetId}`);
  };

  return (
    <Card className="bg-card transition-colors rounded-lg border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">
          Khám phá các mẫu có sẵn
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          Chọn một mẫu để bắt đầu hoặc tạo mới từ đầu.
        </p>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4 py-2">
            {presets.map((preset) => (
              <div key={preset.id} className="flex-none w-[250px] rounded-lg overflow-hidden border bg-background shadow-md hover:shadow-lg transition-all duration-200">
                <img 
                  src={preset.imageUrl || "/public/placeholder.svg"}
                  alt={preset.name} 
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg truncate">{preset.name}</h3>
                  <Button 
                    onClick={() => handleSelectPreset(preset.id)}
                    className="w-full rounded-md"
                  >
                    Bắt đầu với mẫu này
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};