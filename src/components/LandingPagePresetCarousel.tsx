import React, { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { presets } from "@/data/presets";

export const LandingPagePresetCarousel = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for the ScrollArea root
  const scrollViewportRef = useRef<HTMLDivElement | null>(null); // Ref for the actual scrollable viewport

  // State for drag functionality
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // State for auto-scroll
  const autoScrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollSpeed = 1; // pixels per interval
  const intervalTime = 20; // ms
  const resumeAutoScrollDelay = 500; // ms

  // Duplicate presets for seamless looping
  const loopedPresets = [...presets, ...presets]; // Duplicate once

  const handleSelectPreset = (presetId: string) => {
    navigate(`/generator?presetId=${presetId}`);
  };

  // Function to start auto-scrolling
  const startAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) clearInterval(autoScrollInterval.current); // Clear any existing interval

    autoScrollInterval.current = setInterval(() => {
      if (!scrollViewportRef.current || isDragging.current) return; // Don't scroll if dragging

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

  // Function to stop auto-scrolling
  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = null;
    }
  }, []);

  // Effect to initialize and clean up auto-scroll
  useEffect(() => {
    // Find the actual scrollable viewport div after the component mounts
    scrollViewportRef.current = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]') || null;
    
    startAutoScroll(); // Start auto-scroll on mount

    return () => {
      stopAutoScroll(); // Clean up on unmount
    };
  }, [startAutoScroll, stopAutoScroll]);

  // Mouse event handlers for drag-to-scroll
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollViewportRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX; // Use clientX for consistent mouse position
    scrollLeft.current = scrollViewportRef.current.scrollLeft;
    stopAutoScroll(); // Pause auto-scroll when dragging starts
  }, [stopAutoScroll]);

  const onMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      // Resume auto-scroll after a delay
      autoScrollTimeout.current = setTimeout(startAutoScroll, resumeAutoScrollDelay);
    }
  }, [startAutoScroll]);

  const onMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      // Resume auto-scroll after a delay
      autoScrollTimeout.current = setTimeout(startAutoScroll, resumeAutoScrollDelay);
    }
  }, [startAutoScroll]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollViewportRef.current) return;
    e.preventDefault(); // Prevent text selection while dragging

    const x = e.clientX;
    const deltaX = x - startX.current; // How much mouse moved horizontally

    // Only allow scrolling forward (content moves left) when dragging mouse to the right (deltaX > 0)
    if (deltaX < 0) {
      return; // If dragging left, do nothing
    }

    const dragAmount = deltaX * 1.5; // Adjust scroll speed for better feel

    // Calculate new scroll position: scrollLeft increases when dragging mouse right
    let newScrollLeft = scrollLeft.current + dragAmount;

    // Apply the new scroll position
    scrollViewportRef.current.scrollLeft = newScrollLeft;

    // Handle looping for manual drag (only for forward scrolling)
    const originalContentTotalWidth = presets.length * (250 + 16); 
    if (scrollViewportRef.current.scrollLeft >= originalContentTotalWidth) {
      scrollViewportRef.current.scrollLeft -= originalContentTotalWidth;
    }
  }, [presets.length]);

  return (
    <div className="w-full">
      <div className="px-0 py-4">
        <ScrollArea 
          className="w-full whitespace-nowrap pb-0" // pb-0 ensures no padding at the bottom
          ref={scrollAreaRef}
        >
          <div 
            className="flex gap-4 py-2"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            // Change cursor style to indicate draggable area
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
          >
            {loopedPresets.map((preset, index) => ( // Use loopedPresets and unique key
              <div 
                key={`${preset.id}-${index}`} // Unique key for duplicated items
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
          {/* ScrollBar component was already removed in previous step */}
        </ScrollArea>
      </div>
    </div>
  );
};