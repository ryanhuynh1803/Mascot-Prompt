import { useState, useEffect } from "react";
import { MascotPreview } from "./MascotPreview";
import OptionsPanel from "./OptionsPanel";
import { PromptPreview } from "./PromptPreview";
import { SelectedOptions } from "./SelectedOptions";
import { ExportOptions } from "./ExportOptions";
import { QuickPresets } from "./QuickPresets";
import { useMascotConfig } from "@/hooks/useMascotConfig";
import { Badge } from "@/components/ui/badge";
import { PromptOptions } from "@/types/mascot";

export function PromptGenerator() {
  const [visitorCount, setVisitorCount] = useState("");
  const {
    options,
    selectedBodyPart,
    updateOption,
    handleReset,
    handleRandom,
    handleBodyPartSelect,
    handleNextPart,
    handlePreviousPart,
    currentPage,
    totalPages,
    setOptions,
  } = useMascotConfig();

  useEffect(() => {
    // Generate a random visitor count for display
    const randomKCount = (Math.random() * (9.9 - 1.1) + 1.1).toFixed(1);
    setVisitorCount(`${randomKCount}K`);
  }, []);

  const handleApplyPreset = (preset: Partial<PromptOptions>) => {
    setOptions(prev => ({ ...prev, ...preset }));
  };

  const today = new Date().toLocaleDateString('vi-VN');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Trình Tạo Prompt Mascot
            </h1>
            <Badge variant="secondary" className="text-xs font-semibold">
              v6.0
            </Badge>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Tạo prompt chi tiết cho mascot của bạn với giao diện trực quan và dễ sử dụng
          </p>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Panel - Options & Presets */}
          <section className="lg:col-span-4 order-2 lg:order-1 space-y-6">
            <QuickPresets onApplyPreset={handleApplyPreset} />
            <OptionsPanel 
              selectedBodyPart={selectedBodyPart}
              options={options}
              onOptionChange={updateOption}
              onNext={handleNextPart}
              onPrevious={handlePreviousPart}
              onReset={handleReset}
              onRandom={handleRandom}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </section>

          {/* Center Panel - Mascot Preview */}
          <section className="lg:col-span-4 order-1 lg:order-2">
            <MascotPreview 
              selectedBodyPart={selectedBodyPart}
              onBodyPartSelect={handleBodyPartSelect}
            />
          </section>

          {/* Right Panel - Results & Export */}
          <section className="lg:col-span-4 order-3 space-y-6">
            <SelectedOptions options={options} />
            <PromptPreview options={options} />
            <ExportOptions options={options} />
            
            {/* Enhanced Footer */}
            <footer className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Phiên bản 6.0
                  </Badge>
                  <span>•</span>
                  <span>Cập nhật: {today}</span>
                </div>
                <p>
                  Tạo bởi{" "}
                  <a 
                    href="https://www.facebook.com/tu.huynh1803/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    Ryanocode
                  </a>
                </p>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <span>Người truy cập: {visitorCount}</span>
                  <span>•</span>
                  <span className="text-green-600 font-medium">Online</span>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}