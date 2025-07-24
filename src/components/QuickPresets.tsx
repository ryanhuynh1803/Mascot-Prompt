import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, Sparkles } from "lucide-react";
import { PromptOptions } from "@/types/mascot";
import { useToast } from "@/hooks/use-toast";

interface QuickPresetsProps {
  onApplyPreset: (preset: Partial<PromptOptions>) => void;
}

const presets = [
  {
    name: "Tech Startup",
    icon: "💻",
    description: "Modern, friendly tech mascot",
    options: {
      artStyle: "Minimalist",
      characterType: "Robot",
      personalityTraits: "Friendly",
      fieldOfUse: "Tech",
      material: "Plastic",
      facialExpression: "Confident with slight smirk",
      backgroundColor: "#F0F4F8"
    }
  },
  {
    name: "Education",
    icon: "📚",
    description: "Wise, approachable learning companion",
    options: {
      artStyle: "Kawaii",
      characterType: "Animal",
      personalityTraits: "Thoughtful",
      fieldOfUse: "Education",
      material: "Fabric",
      facialExpression: "Smiling gently, happy and engaged",
      accessories: "Big round glasses, brown leather crossbody bag",
      backgroundColor: "#FFF8E1"
    }
  },
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Caring, trustworthy medical assistant",
    options: {
      artStyle: "Realistic",
      characterType: "Human",
      personalityTraits: "Gentle",
      fieldOfUse: "Healthcare",
      material: "Soft Vinyl",
      facialExpression: "Peaceful and content",
      backgroundColor: "#E8F5E8"
    }
  },
  {
    name: "Gaming",
    icon: "🎮",
    description: "Energetic, playful game character",
    options: {
      artStyle: "Cartoonish",
      characterType: "Fantasy Creature",
      personalityTraits: "Energetic",
      fieldOfUse: "Gaming",
      material: "Glowing Plasma",
      facialExpression: "Big wide smile showing excitement",
      backgroundColor: "#1A1A2E"
    }
  },
  {
    name: "Food & Beverage",
    icon: "🍕",
    description: "Appetizing, cheerful food mascot",
    options: {
      artStyle: "Chibi",
      characterType: "Food items",
      personalityTraits: "Playful",
      fieldOfUse: "F&B (Food & Beverage)",
      material: "Velvet",
      facialExpression: "Winking playfully",
      backgroundColor: "#FFF3E0"
    }
  },
  {
    name: "Finance",
    icon: "💰",
    description: "Professional, trustworthy financial advisor",
    options: {
      artStyle: "Flat design",
      characterType: "Human",
      personalityTraits: "Confident",
      fieldOfUse: "Finance",
      material: "Metal",
      facialExpression: "Confident with slight smirk",
      backgroundColor: "#E3F2FD"
    }
  }
];

export const QuickPresets = ({ onApplyPreset }: QuickPresetsProps) => {
  const { toast } = useToast();

  const handleApplyPreset = (preset: typeof presets[0]) => {
    onApplyPreset(preset.options);
    toast({
      title: "Preset đã được áp dụng!",
      description: `Đã áp dụng preset "${preset.name}" thành công.`,
    });
  };

  return (
    <Card className="shadow-lg border-2 hover:border-primary/20 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Preset Nhanh
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Áp dụng nhanh các cấu hình phổ biến
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-2">
          <div className="space-y-3">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-muted hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{preset.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm">{preset.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {preset.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Preset
                  </Badge>
                </div>
                <Button
                  onClick={() => handleApplyPreset(preset)}
                  size="sm"
                  className="w-full"
                  variant="outline"
                >
                  Áp dụng
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};