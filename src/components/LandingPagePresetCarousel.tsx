import React, { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { presets } from "@/data/presets";

export const LandingPagePresetCarousel = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the ScrollArea root
  const scrollViewportRef = useRef<HTMLDivElement | null>(null); // Ref for the actual scrollable viewport

  // State for auto-scroll
  const autoScrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollSpeed = 1; // pixels per interval
  const intervalTime = 20; // ms

  // Duplicate presets for seamless looping
  const loopedPresets = [...presets, ...presets]; // Duplicate once

  const handleSelectPreset = (presetId: string) => {
    navigate(`/generator?presetId=${presetId}`);
  };

  // Function to stop auto-scrolling
  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  // Function to start auto-scrolling
  const startAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) clearInterval(autoScrollInterval.current); // Clear any existing interval

    autoScrollInterval.current = setInterval(() => {
      if (!scrollViewportRef.current) return;

      const currentScrollLeft = scrollViewportRef.current.scrollLeft;
      // Calculate the width of a single item including its right margin/gap
      // w-[250px] + gap-4 (16px) = 266px
      const itemWidthWithGap = 250 + 16; 
      // The total width of the *original* set of items
      const originalContentTotalWidth = presets.length * itemWidthWithGap;

      if (currentScrollLeft >= originalContentTotalWidth) {
        // If we've scrolled past the end of the first set of items,
        // instantly jump back to the beginning of the second set.
        scrollViewportRef.current.scrollTo({ left: currentScrollLeft - originalContentTotalWidth, behavior: 'auto' });
      } else {
        // Continue scrolling smoothly
        scrollViewportRef.current.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
      }
    }, intervalTime);
  }, [presets.length]); // Depend on presets.length to recalculate originalContentTotalWidth if presets change

  // Effect to initialize and clean up auto-scroll
  useEffect(() => {
    // Find the actual scrollable viewport div after the component mounts
    scrollViewportRef.current = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]') || null;
    
    startAutoScroll(); // Start auto-scroll on mount

    return () => {
      stopAutoScroll(); // Clean up on unmount
    };
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <div className="w-full">
      <div className="px-0 py-4">
        <ScrollArea 
          className="w-full whitespace-nowrap pb-0"
          ref={scrollAreaRef}
        >
          <div 
            className="flex gap-4 py-2"
            onMouseEnter={stopAutoScroll} // Dừng cuộn khi rê chuột vào
            onMouseLeave={startAutoScroll} // Tiếp tục cuộn khi rê chuột ra
          >
            {loopedPresets.map((preset, index) => (
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
        </ScrollArea>
      </div>
    </div>
  );
};