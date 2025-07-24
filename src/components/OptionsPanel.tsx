import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BodyPart, PromptOptions, bodyPartOptions } from '@/types/mascot';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Dices, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Progress } from './ui/progress';
import MascotOptionControl from './MascotOptionControl';

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
  head: 'Đầu',
  expression: 'Biểu cảm',
  body: 'Thân',
  accessories: 'Phụ kiện',
  context: 'Bối cảnh',
  view: 'Góc nhìn',
  legs: 'Chân',
  colors: 'Màu sắc'
};

const partIcons: Record<BodyPart, React.ReactNode> = {
  head: '👤',
  expression: '😊',
  body: '👕',
  accessories: '🎒',
  context: '🏢',
  view: '📐',
  legs: '👟',
  colors: '🎨'
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
    <Card className="flex flex-col h-full shadow-lg border-2 hover:border-primary/20 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{partIcons[selectedBodyPart]}</div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
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
                <Button variant="outline" size="icon" onClick={onPrevious} aria-label="Phần trước">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Phần trước</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onNext} aria-label="Phần tiếp theo">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Phần tiếp theo</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Tiến độ</span>
            <span>{currentPage}/{totalPages}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <ScrollArea className="h-[400px] pr-4">
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

      <CardFooter className="pt-4 border-t">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{partLabels[selectedBodyPart]}</span>
            <span className="ml-2">({currentPage}/{totalPages})</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={onRandom} aria-label="Tùy chọn ngẫu nhiên">
                  <Dices className="h-4 w-4 mr-2" />
                  Ngẫu nhiên
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tạo các lựa chọn ngẫu nhiên cho tất cả tùy chọn</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="secondary" onClick={onReset} aria-label="Làm mới lựa chọn">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Làm mới
                </Button>
              </TooltipTrigger>
              <TooltipContent>
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