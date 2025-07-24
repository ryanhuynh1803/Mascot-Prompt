import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { presets } from "@/data/presets";

export const LandingPagePresetCarousel = () => {
  const navigate = useNavigate();

  const handleSelectPreset = (presetId: string) => {
    navigate(`/generator?presetId=${presetId}`);
  };

  return (
    <div className="w-full">
      <div className="px-6 py-4">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4 py-2">
            {presets.map((preset) => (
              <div 
                key={preset.id} 
                onClick={() => handleSelectPreset(preset.id)} 
                className="flex-none w-[250px] rounded-lg overflow-hidden cursor-pointer"
              >
                <img 
                  src={preset.imageUrl || "/public/placeholder.svg"}
                  alt={preset.name} 
                  className="w-full h-[350px] object-cover rounded-lg" // Changed height to h-[350px] for vertical rectangle
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};