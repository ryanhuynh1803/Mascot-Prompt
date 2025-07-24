import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area"; // Removed ScrollBar import
import { presets } from "@/data/presets";

export const LandingPagePresetCarousel = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSelectPreset = (presetId: string) => {
    navigate(`/generator?presetId=${presetId}`);
  };

  // Duplicate presets for seamless looping
  const loopedPresets = [...presets, ...presets]; // Duplicate once

  useEffect(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
    if (!scrollViewport) return;

    const scrollSpeed = 1; // pixels per interval
    const intervalTime = 20; // ms

    // Calculate the width of a single item including its right margin/gap
    // w-[250px] + gap-4 (16px) = 266px
    const itemWidthWithGap = 250 + 16; 
    // The total width of the *original* set of items
    const originalContentTotalWidth = presets.length * itemWidthWithGap;

    const scrollInterval = setInterval(() => {
      if (!scrollViewport) return;

      // If we've scrolled past the end of the first set of items,
      // instantly jump back to the beginning of the second set.
      // We check if current scroll position is greater than or equal to the width of the original content.
      if (scrollViewport.scrollLeft >= originalContentTotalWidth) {
        scrollViewport.scrollLeft -= originalContentTotalWidth; // Jump back by one full set
      }

      // Continue scrolling smoothly
      scrollViewport.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
    }, intervalTime);

    // Cleanup function
    return () => clearInterval(scrollInterval);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="w-full">
      <div className="px-0 py-4">
        <ScrollArea className="w-full whitespace-nowrap pb-0" ref={scrollAreaRef}> {/* Changed pb-4 to pb-0 */}
          <div className="flex gap-4 py-2">
            {loopedPresets.map((preset, index) => ( // Use loopedPresets and unique key
              <div 
                key={`${preset.id}-${index}`} 
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
          {/* Removed ScrollBar component */}
        </ScrollArea>
      </div>
    </div>
  );
};