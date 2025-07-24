import { memo, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MousePointer2, Eye, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyPart } from "@/types/mascot";

interface MascotPreviewProps {
  selectedBodyPart: BodyPart;
  onBodyPartSelect: (part: BodyPart) => void;
}

const bodyParts: { part: BodyPart; label: string; icon: string }[] = [
  { part: 'head', label: 'Đầu', icon: '👤' },
  { part: 'expression', label: 'Biểu cảm', icon: '😊' },
  { part: 'body', label: 'Thân', icon: '👕' },
  { part: 'accessories', label: 'Phụ kiện', icon: '🎒' },
  { part: 'legs', label: 'Chân', icon: '👟' },
  { part: 'colors', label: 'Màu sắc', icon: '🎨' },
  { part: 'context', label: 'Bối cảnh', icon: '🏢' },
  { part: 'view', label: 'Góc nhìn', icon: '📐' }
];

export const MascotPreview = memo(({ selectedBodyPart, onBodyPartSelect }: MascotPreviewProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active tab
  useEffect(() => {
    if (!scrollAreaRef.current || !tabsListRef.current) return;

    const scrollViewport = scrollAreaRef.current.querySelector<HTMLDivElement>('div[data-radix-scroll-area-viewport]');
    const activeTab = tabsListRef.current.querySelector<HTMLButtonElement>(`[data-state="active"]`);

    if (!scrollViewport || !activeTab) return;

    const scrollAreaWidth = scrollViewport.offsetWidth;
    const activeTabWidth = activeTab.offsetWidth;
    const activeTabOffsetLeft = activeTab.offsetLeft;

    const scrollPosition = activeTabOffsetLeft - (scrollAreaWidth / 2) + (activeTabWidth / 2);

    scrollViewport.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [selectedBodyPart]);

  const getButtonClasses = useCallback((part: BodyPart) => {
    const baseClasses = "absolute transition-all duration-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm";
    const activeClasses = "bg-primary/40 border-primary shadow-lg ring-2 ring-primary/30";
    const inactiveClasses = "bg-background/60 hover:bg-primary/20 border-muted-foreground/30 hover:border-primary/70";
    
    return `${baseClasses} ${selectedBodyPart === part ? activeClasses : inactiveClasses}`;
  }, [selectedBodyPart]);

  return (
    <Card className="shadow-lg border-2 hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Xem Trước Mascot
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Palette className="w-3 h-3" />
            Tương tác
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Click vào các phần để chỉnh sửa hoặc sử dụng tabs bên dưới
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        {/* Interactive Mascot Image */}
        <div className="relative group w-full max-w-[300px]">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <img 
              src="https://i.pinimg.com/1200x/ce/31/a8/ce31a87217b46a9981ffa7c2d4dd9c50.jpg" 
              alt="Mascot Preview"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg shadow-lg border-2 border-muted"
              loading="lazy"
            />
            
            {/* Interactive Overlay Buttons */}
            <div className="absolute inset-0" role="group" aria-label="Mascot body parts">
              {/* Head Area */}
              <button
                onClick={() => onBodyPartSelect('head')}
                className={`${getButtonClasses('head')} top-[5%] left-1/2 transform -translate-x-1/2 w-[55%] h-[40%] rounded-full`}
                title="Click để chỉnh sửa phần đầu"
                aria-label="Chỉnh sửa phần đầu"
              >
                {selectedBodyPart === 'head' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="default" className="text-xs font-bold">
                      👤 ĐẦU
                    </Badge>
                  </div>
                )}
              </button>
              
              {/* Body Area */}
              <button
                onClick={() => onBodyPartSelect('body')}
                className={`${getButtonClasses('body')} top-[45%] left-1/2 transform -translate-x-1/2 w-[70%] h-[35%]`}
                title="Click để chỉnh sửa phần thân"
                aria-label="Chỉnh sửa phần thân"
              >
                {selectedBodyPart === 'body' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="default" className="text-xs font-bold">
                      👕 THÂN
                    </Badge>
                  </div>
                )}
              </button>
              
              {/* Legs Area */}
              <button
                onClick={() => onBodyPartSelect('legs')}
                className={`${getButtonClasses('legs')} bottom-[5%] left-1/2 transform -translate-x-1/2 w-[50%] h-[15%]`}
                title="Click để chỉnh sửa phần chân"
                aria-label="Chỉnh sửa phần chân"
              >
                {selectedBodyPart === 'legs' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge variant="default" className="text-xs font-bold">
                      👟 CHÂN
                    </Badge>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Navigation Tabs */}
        <Tabs 
          value={selectedBodyPart} 
          onValueChange={(value) => onBodyPartSelect(value as BodyPart)} 
          className="w-full max-w-[300px]"
        >
          <ScrollArea className="w-full whitespace-nowrap" ref={scrollAreaRef}>
            <TabsList className="w-max bg-muted/50 p-1" ref={tabsListRef}>
              {bodyParts.map(({ part, label, icon }) => (
                <TabsTrigger 
                  key={part} 
                  value={part} 
                  className="px-3 py-2 transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <span className="mr-1">{icon}</span>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>

        {/* Current Selection Indicator */}
        <div className="text-center">
          <Badge variant="outline" className="text-sm">
            Đang chỉnh sửa: {bodyParts.find(bp => bp.part === selectedBodyPart)?.icon} {bodyParts.find(bp => bp.part === selectedBodyPart)?.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
});

MascotPreview.displayName = "MascotPreview";