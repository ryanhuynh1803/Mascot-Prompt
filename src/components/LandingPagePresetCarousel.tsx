import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { presets } from "@/data/presets";

export const LandingPagePresetCarousel = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the ScrollArea

  const handleSelectPreset = (presetId: string) => {
    navigate(`/generator?presetId=${presetId}`);
  };

  useEffect(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
    if (!scrollViewport) return;

    const scrollSpeed = 1; // pixels per interval
    const intervalTime = 20; // ms

    const scrollInterval = setInterval(() => {
      // Check if we've reached the end of the scrollable content
      if (scrollViewport.scrollLeft + scrollViewport.clientWidth >= scrollViewport.scrollWidth) {
        // If at the end, instantly reset to the beginning
        scrollViewport.scrollTo({ left: 0, behavior: 'auto' }); 
      } else {
        // Otherwise, scroll by a small amount smoothly
        scrollViewport.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
      }
    }, intervalTime);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(scrollInterval);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="w-full">
      {/* Changed px-6 to px-0 to allow full width, py-4 for vertical padding */}
      <div className="px-0 py-4"> 
        <ScrollArea className="w-full whitespace-nowrap pb-4" ref={scrollAreaRef}>
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
                  className="w-full h-[350px] object-cover rounded-lg"
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