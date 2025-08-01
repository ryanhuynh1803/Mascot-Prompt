import { memo, useCallback, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PromptOptions } from "@/types/mascot";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { buildPrompt } from "@/lib/prompt-builder";

interface PromptPreviewProps {
  options: Partial<PromptOptions>;
}

export const PromptPreview = memo(({ options }: PromptPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatedPrompt = useMemo(() => buildPrompt(options), [options]);
  const wordCount = useMemo(() => generatedPrompt.split(/\s+/).length, [generatedPrompt]);
  const charCount = useMemo(() => generatedPrompt.length, [generatedPrompt]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Đã sao chép!",
        description: "Prompt đã được sao chép vào clipboard.",
      });
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép prompt.",
        variant: "destructive",
      });
    }
  }, [generatedPrompt, toast]);

  return (
    <Card className="border-2 bg-card transition-colors rounded-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Xem Trước Prompt
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs rounded-md">
                {wordCount} từ
              </Badge>
              <Button 
                onClick={copyToClipboard}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md"
                disabled={copied}
              >
                {copied ? "Đã sao chép" : "Sao chép"}
              </Button>
            </div>
          </div>
          {/* Removed character count, word count, and 'Sẵn sàng sử dụng' status */}
        </CardHeader>
        <CardContent>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-center hover:bg-muted/50 transition-colors rounded-md">
              <span className="flex items-center gap-2">
                {isOpen ? "Ẩn" : "Hiển thị"} Preview
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <ScrollArea className="h-[250px] bg-muted p-4 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                {generatedPrompt}
              </pre>
            </ScrollArea>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Prompt được tạo tự động từ các lựa chọn của bạn</span>
              <Badge variant="outline" className="text-xs rounded-md">
                Cập nhật real-time
              </Badge>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
});

PromptPreview.displayName = "PromptPreview";