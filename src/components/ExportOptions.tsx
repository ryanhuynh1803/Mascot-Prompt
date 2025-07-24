import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptOptions } from "@/types/mascot";
import { buildPrompt } from "@/lib/prompt-builder";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface ExportOptionsProps {
  options: Partial<PromptOptions>;
}

export const ExportOptions = ({ options }: ExportOptionsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const generatedPrompt = buildPrompt(options);

  const exportAsText = async () => {
    setIsExporting(true);
    try {
      const blob = new Blob([generatedPrompt], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mascot-prompt-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Xuất thành công!",
        description: "Prompt đã được tải xuống dưới dạng file text.",
      });
    } catch (error) {
      toast({
        title: "Lỗi xuất file",
        description: "Không thể xuất prompt. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsJSON = async () => {
    setIsExporting(true);
    try {
      const exportData = {
        version: "6.0",
        timestamp: new Date().toISOString(),
        options,
        prompt: generatedPrompt,
        metadata: {
          wordCount: generatedPrompt.split(/\s+/).length,
          charCount: generatedPrompt.length,
        }
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mascot-config-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Xuất thành công!",
        description: "Cấu hình đã được tải xuống dưới dạng JSON.",
      });
    } catch (error) {
      toast({
        title: "Lỗi xuất file",
        description: "Không thể xuất cấu hình. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const sharePrompt = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mascot Prompt Generator',
          text: generatedPrompt,
        });
        toast({
          title: "Chia sẻ thành công!",
          description: "Prompt đã được chia sẻ.",
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast({
        title: "Đã sao chép!",
        description: "Prompt đã được sao chép vào clipboard.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép prompt.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg border-2 hover:border-primary/20 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Xuất & Chia sẻ
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tải xuống hoặc chia sẻ prompt của bạn
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={exportAsText}
            disabled={isExporting}
            variant="outline"
            className="flex items-center gap-2"
          >
            Text File
          </Button>
          
          <Button
            onClick={exportAsJSON}
            disabled={isExporting}
            variant="outline"
            className="flex items-center gap-2"
          >
            JSON Config
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={sharePrompt}
            variant="secondary"
            className="flex items-center gap-2"
          >
            Chia sẻ
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="secondary"
            className="flex items-center gap-2"
          >
            Sao chép
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>Định dạng hỗ trợ</span>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs">TXT</Badge>
            <Badge variant="outline" className="text-xs">JSON</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};