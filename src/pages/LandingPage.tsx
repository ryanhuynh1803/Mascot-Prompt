import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/generator');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 md:p-6 text-center animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Trình Tạo Prompt Mascot
          </h1>
          <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
            v6.0
          </Badge>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Tạo prompt chi tiết cho mascot của bạn với giao diện trực quan và dễ sử dụng. Khám phá vô vàn khả năng sáng tạo!
        </p>
        <Button 
          onClick={handleStart} 
          size="lg" 
          className="mt-8 px-8 py-3 text-lg font-semibold transition-all duration-300"
        >
          Bắt đầu
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;