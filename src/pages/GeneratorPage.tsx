import { useState, useEffect } from "react";
import { MascotPreview } from "@/components/MascotPreview";
import OptionsPanel from "@/components/OptionsPanel";
import { PromptPreview } from "@/components/PromptPreview";
import { SelectedOptions } from "@/components/SelectedOptions";
import { useMascotConfig } from "@/hooks/useMascotConfig";
import { Badge } from "@/components/ui/badge";
import { PresetSelector } from "@/components/PresetSelector";
import { Preset, presets } from "@/data/presets";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const randomKCount = (Math.random() * (9.9 - 1.1) + 1.1).toFixed(1);
    setVisitorCount(`${randomKCount}K`);
  }, []);

  useEffect(() => {
    const presetId = searchParams.get('presetId');
    if (presetId) {
      const selectedPreset = presets.find(p => p.id === presetId);
      if (selectedPreset) {
        applyPreset(selectedPreset.options, selectedPreset.imageUrl);
      }
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, applyPreset, setSearchParams]);

  const handleApplyPreset = (preset: Preset) => {
    applyPreset(preset.options, preset.imageUrl);
  };

  const today = new Date().toLocaleDateString('vi-VN');

  return (
    <div className="min-h-screen bg-background text-foreground px-4 pt-0 pb-4 md:px-6 md:pt-0 md:pb-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-end mb-4">
          {/* <ThemeToggle /> */}
        </header>

        <main className="space-y-4">
          <section className="mt-0">
            <PresetSelector onApplyPreset={handleApplyPreset} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
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

            <section className="lg:col-span-4 order-1 lg:order-2">
              <MascotPreview 
                selectedBodyPart={selectedBodyPart}
                onBodyPartSelect={handleBodyPartSelect}
                mascotImageUrl={mascotImageUrl}
              />
            </section>

            <section className="lg:col-span-4 order-3 space-y-6">
              <SelectedOptions options={options} />
              <PromptPreview options={options} />
              
              <footer className="bg-card rounded-lg p-4 border rounded-lg">
                <div className="text-center text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="text-xs rounded-md">
                      Phiên bản 6.0
                    </Badge>
                    <span>•</span>
                    <span>Cập nhật: {today}</span>
                  </div>
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