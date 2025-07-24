import { useState, useEffect } from "react";
import { MascotPreview } from "./MascotPreview";
import OptionsPanel from "./OptionsPanel";
import { PromptPreview } from "./PromptPreview";
import { SelectedOptions } from "./SelectedOptions";
import { useMascotConfig } from "@/hooks/useMascotConfig";
import { Badge } from "@/components/ui/badge";
import { PromptOptions } from "@/types/mascot";
import { PresetSelector } from "./PresetSelector";
import { Preset } from "@/data/presets";
// import { ThemeToggle } from "./ThemeToggle"; // Import ThemeToggle

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
    applyPreset,
    mascotImageUrl,
  } = useMascotConfig();

  useEffect(() => {
    // Generate a random visitor count for display
    const randomKCount = (Math.random() * (9.9 - 1.1) + 1.1).toFixed(1);
    setVisitorCount(`${randomKCount}K`);
  }, []);

  const handleApplyPreset = (preset: Preset) => {
    applyPreset(preset.options, preset.imageUrl);
  };

  const today = new Date().toLocaleDateString('vi-VN');

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-end mb-4">
          {/* <ThemeToggle /> */}
        </header>

        {/* Main Content Grid */}
        <main className="space-y-4"> {/* Changed space-y-6 to space-y-4 to reduce vertical gap */}
          {/* Preset Selector Section (moved to top) */}
          <section>
            <PresetSelector onApplyPreset={handleApplyPreset} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Left Panel - Options */}
            <section className="lg:col-span-4 order-2 lg:order-1 space-y-6">
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
                mascotImageUrl={mascotImageUrl}
              />
            </section>

            {/* Right Panel - Results & Export */}
            <section className="lg:col-span-4 order-3 space-y-6">
              <SelectedOptions options={options} />
              <PromptPreview options={options} />
              
              {/* Enhanced Footer */}
              <footer className="bg-card rounded-lg p-4 border rounded-lg">
                <div className="text-center text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="text-xs rounded-md">
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
                      className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
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
          </div>
        </main>
      </div>
    </div>
  );
}