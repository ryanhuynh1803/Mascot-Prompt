import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BodyPart, PromptOptions, bodyPartOptions } from '@/types/mascot';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Progress } from './ui/progress';
import MascotOptionControl from './MascotOptionControl';
import { bodyPartsOrder } from '@/types/mascot';

interface OptionsPanelProps {
  selectedBodyPart: BodyPart;
  options: Partial<PromptOptions>;
  onOptionChange: (key: keyof PromptOptions, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onRandom: () => void;
  currentPage: number;
  totalPages: number;
}

const partLabels: Record<BodyPart, string> = {
  character: 'Nhân vật',
  costume: 'Trang phục',
  legs: 'Chân', // New
  face: 'Khuôn mặt',
  materials: 'Chất liệu',
  environment: 'Môi trường',
  context: 'Bối cảnh'
};

const OptionsPanelComponent = ({ 
  selectedBodyPart, 
  options, 
  onOptionChange, 
  onNext, 
  onPrevious, 
  onReset, 
  onRandom, 
  currentPage, 
  totalPages 
}: OptionsPanelProps) => {
  const optionsToShow = bodyPartOptions[selectedBodyPart] as (keyof PromptOptions)[];
  const progressPercentage = (currentPage / totalPages) * 100;

  // Count selected options for current part
  const selectedCount = optionsToShow.filter(key => options[key] && options[key]?.trim() !== '').length;
  const totalCount = optionsToShow.length;

  return (
    <Card className="flex flex-col border-2 bg-card transition-colors rounded-lg"> {/* Removed h-[500px] */}
      <CardHeader className="pb-4 px-6"> {/* Added px-6 for consistent padding */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                {partLabels[selectedBodyPart]}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedCount}/{totalCount} tùy chọn đã chọn
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onPrevious} aria-label="Phần trước" className="rounded-md">
                  Trước
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md">Phần trước</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onNext} aria-label="Phần tiếp theo" className="rounded-md">
                  Tiếp
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md">Phần tiếp theo</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2 mt-4">
          <Progress value={progressPercentage} className="h-2 rounded-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Tiến độ</span>
            <span>{currentPage}/{totalPages}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow px-6"> {/* Added px-6 for consistent padding */}
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {optionsToShow.map((key, index) => (
              <div key={key} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <MascotOptionControl
                  optionKey={key}
                  value={options[key]}
                  onOptionChange={onOptionChange}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="pt-4 px-6 border-t"> {/* Added px-6 for consistent padding */}
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{partLabels[selectedBodyPart]}</span>
            <span className="ml-2">({currentPage}/{totalPages})</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={onRandom} aria-label="Tùy chọn ngẫu nhiên" className="rounded-md">
                  Ngẫu nhiên
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md">
                <p>Tạo các lựa chọn ngẫu nhiên cho tất cả tùy chọn</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="secondary" onClick={onReset} aria-label="Làm mới lựa chọn" className="rounded-md">
                  Làm mới
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-md">
                <p>Đặt lại tất cả lựa chọn về mặc định</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(OptionsPanelComponent);