import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PromptOptions, bodyPartOptions } from "@/types/mascot";
import { optionKeyTranslations, translations } from "@/data/translations";

interface SelectedOptionsProps {
  options: Partial<PromptOptions>;
}

export const SelectedOptions = ({ options }: SelectedOptionsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const selectedOptions = useMemo(() => {
    return Object.entries(options).filter(([, value]) => value && value.trim() !== '');
  }, [options]);

  const selectedCount = selectedOptions.length;
  const totalOptions = Object.keys(optionKeyTranslations).length;
  const completionPercentage = Math.round((selectedCount / totalOptions) * 100);

  // Group options by body part
  const groupedOptions = useMemo(() => {
    const groups: Record<string, Array<[string, string]>> = {};
    
    for (const [bodyPart, optionKeys] of Object.entries(bodyPartOptions)) {
      const partOptions = selectedOptions.filter(([key]) => 
        optionKeys.includes(key as keyof PromptOptions)
      );
      if (partOptions.length > 0) {
        groups[bodyPart] = partOptions;
      }
    }
    
    return groups;
  }, [selectedOptions]);

  const partLabels: Record<string, string> = {
    head: 'Đầu',
    expression: 'Biểu cảm',
    body: 'Thân',
    accessories: 'Phụ kiện',
    context: 'Bối cảnh',
    view: 'Góc nhìn',
    legs: 'Chân',
    colors: 'Màu sắc'
  };

  return (
    <Card className="shadow-lg border-2 hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Các lựa chọn của bạn
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={completionPercentage > 50 ? "default" : "secondary"} className="text-xs">
              {completionPercentage}% hoàn thành
            </Badge>
            <Badge variant="outline" className="text-xs">
              {selectedCount}/{totalOptions}
            </Badge>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedCount > 0 
            ? `Bạn đã chọn ${selectedCount} tùy chọn từ ${Object.keys(groupedOptions).length} phần`
            : "Chưa có lựa chọn nào được thực hiện"
          }
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-center">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full hover:bg-muted/50 transition-colors">
                <span className="flex items-center gap-2">
                  {isOpen ? "Ẩn chi tiết" : `Hiển thị chi tiết (${selectedCount} lựa chọn)`}
                </span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            {selectedCount > 0 ? (
              <ScrollArea className="h-[200px] pr-2">
                <div className="space-y-4">
                  {Object.entries(groupedOptions).map(([bodyPart, partOptions]) => (
                    <div key={bodyPart} className="space-y-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-muted">
                        <h4 className="font-medium text-sm text-foreground">
                          {partLabels[bodyPart] || bodyPart}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {partOptions.length}
                        </Badge>
                      </div>
                      <div className="space-y-1 pl-2">
                        {partOptions.map(([key, value]) => {
                          const typedKey = key as keyof PromptOptions;
                          const translatedKey = optionKeyTranslations[typedKey] || typedKey;
                          const translatedValue = (translations[typedKey as keyof typeof translations] as Record<string, string>)?.[value] || value;
                          
                          return (
                            <div key={key} className="flex items-start gap-3 py-1">
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-muted-foreground">
                                  {translatedKey}
                                </div>
                                <div className="text-sm text-foreground truncate">
                                  {translatedValue}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Chưa có lựa chọn nào được thực hiện
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hãy bắt đầu bằng cách chọn các tùy chọn ở bên trái
                  </p>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};