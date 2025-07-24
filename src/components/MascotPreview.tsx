import { memo, useRef, useEffect, useCallback, useState } from "react"; // Import useState
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BodyPart } from "@/types/mascot";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

interface MascotPreviewProps {
  selectedBodyPart: BodyPart;
  onBodyPartSelect: (part: BodyPart) => void;
  mascotImageUrl: string;
}

const bodyParts: { part: BodyPart; label: string }[] = [
  { part: 'character', label: 'Nhân vật' },
  { part: 'costume', label: 'Trang phục' },
  { part: 'legs', label: 'Chân' },
  { part: 'face', label: 'Khuôn mặt' },
  { part: 'materials', label: 'Chất liệu' },
  { part: 'environment', label: 'Môi trường' },
  { part: 'context', label: 'Bối cảnh' }
];

export const MascotPreview = memo(({ selectedBodyPart, onBodyPartSelect, mascotImageUrl }: MascotPreviewProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false); // State để theo dõi việc tải ảnh

  // Reset imageLoaded khi URL ảnh thay đổi
  useEffect(() => {
    setImageLoaded(false);
  }, [mascotImageUrl]);

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

  return (
    <Card className="border-2 bg-card transition-colors rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Xem Trước Mascot
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1 rounded-md">
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
          <div className="relative">
            {!imageLoaded && (
              <Skeleton className="w-full h-[300px] rounded-lg border-2 border-muted" />
            )}
            <img 
              src={mascotImageUrl}
              alt="Mascot Preview"
              className={`w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg border-2 border-muted ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)} // Đặt imageLoaded thành true khi ảnh tải xong
              // Đã bỏ loading="lazy"
            />
            
            {imageLoaded && ( // Chỉ hiển thị overlay khi ảnh đã tải
              <div className="absolute inset-0" role="group" aria-label="Mascot body parts">
                {/* Character Area (covers most of the mascot) */}
                <button
                  onClick={() => onBodyPartSelect('character')}
                  className={`
                    absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[90%] h-[90%] rounded-lg
                    transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-foreground
                    ${selectedBodyPart === 'character' 
                      ? 'border-foreground ring-2 ring-foreground' 
                      : 'bg-transparent hover:bg-transparent border-transparent'
                    }
                  `}
                  title="Click để chỉnh sửa phần nhân vật"
                  aria-label="Chỉnh sửa phần nhân vật"
                >
                  {selectedBodyPart === 'character' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="default" className="text-xs font-bold rounded-md">
                        NHÂN VẬT
                      </Badge>
                    </div>
                  )}
                </button>
                
                {/* Face Area (smaller, on top of character) */}
                <button
                  onClick={() => onBodyPartSelect('face')}
                  className={`
                    absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[40%] h-[30%] rounded-full
                    transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-foreground
                    ${selectedBodyPart === 'face' 
                      ? 'border-foreground ring-2 ring-foreground' 
                      : 'bg-transparent hover:bg-transparent border-transparent'
                    }
                  `}
                  title="Click để chỉnh sửa phần khuôn mặt"
                  aria-label="Chỉnh sửa phần khuôn mặt"
                >
                  {selectedBodyPart === 'face' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="default" className="text-xs font-bold rounded-md">
                        KHUÔN MẶT
                      </Badge>
                    </div>
                  )}
                </button>

                {/* Costume Area (covers body, but distinct from character general) */}
                <button
                  onClick={() => onBodyPartSelect('costume')}
                  className={`
                    absolute top-[40%] left-1/2 transform -translate-x-1/2 w-[70%] h-[40%] rounded-lg
                    transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-foreground
                    ${selectedBodyPart === 'costume' 
                      ? 'border-foreground ring-2 ring-foreground' 
                      : 'bg-transparent hover:bg-transparent border-transparent'
                    }
                  `}
                  title="Click để chỉnh sửa phần trang phục"
                  aria-label="Chỉnh sửa phần trang phục"
                >
                  {selectedBodyPart === 'costume' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="default" className="text-xs font-bold rounded-md">
                        TRANG PHỤC
                      </Badge>
                    </div>
                  )}
                </button>

                {/* Legs Area (new) */}
                <button
                  onClick={() => onBodyPartSelect('legs')}
                  className={`
                    absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[60%] h-[30%] rounded-lg
                    transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-foreground
                    ${selectedBodyPart === 'legs' 
                      ? 'border-foreground ring-2 ring-foreground' 
                      : 'bg-transparent hover:bg-transparent border-transparent'
                    }
                  `}
                  title="Click để chỉnh sửa phần chân"
                  aria-label="Chỉnh sửa phần chân"
                >
                  {selectedBodyPart === 'legs' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="default" className="text-xs font-bold rounded-md">
                        CHÂN
                      </Badge>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Navigation Tabs */}
        <Tabs 
          value={selectedBodyPart} 
          onValueChange={(value) => onBodyPartSelect(value as BodyPart)} 
          className="w-full max-w-[300px]"
        >
          <ScrollArea className="w-full whitespace-nowrap" ref={scrollAreaRef}>
            <TabsList className="w-max bg-muted p-1 rounded-lg border border-border" ref={tabsListRef}>
              {bodyParts.map(({ part, label }) => (
                <TabsTrigger 
                  key={part} 
                  value={part} 
                  className="px-3 py-2 transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </Tabs>

        {/* Current Selection Indicator */}
        <div className="text-center">
          <Badge variant="outline" className="text-sm rounded-md">
            Đang chỉnh sửa: {bodyParts.find(bp => bp.part === selectedBodyPart)?.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
});

MascotPreview.displayName = "MascotPreview";