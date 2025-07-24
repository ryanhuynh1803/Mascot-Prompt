import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LandingPagePresetCarousel } from '@/components/LandingPagePresetCarousel';

const LandingPage = () => {
  const navigate = useNavigate();
  // Không cần state mousePosition nữa vì con trỏ sẽ được quản lý bằng CSS

  useEffect(() => {
    // Xóa bỏ việc ẩn/hiện con trỏ mặc định bằng JS
    // document.body.style.cursor = 'none';
    // const handleMouseMove = (e: MouseEvent) => {
    //   setMousePosition({ x: e.clientX, y: e.clientY });
    // };
    // window.addEventListener('mousemove', handleMouseMove);
    // return () => {
    //   document.body.style.cursor = 'default';
    //   window.removeEventListener('mousemove', handleMouseMove);
    // };
  }, []);

  const handleStart = () => {
    navigate('/generator');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 md:p-6 text-center animate-fade-in relative overflow-hidden">
      {/* Đã xóa phần tử con trỏ theo chuột (img tag) vì nó sẽ được quản lý bằng CSS */}

      <div className="max-w-3xl mx-auto space-y-6 z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Trình Tạo Prompt Mascot
          </h1>
          <Badge variant="secondary" className="text-sm font-semibold px-3 py-1 rounded-md">
            v6.0
          </Badge>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Tạo prompt chi tiết cho mascot của bạn với giao diện trực quan và dễ sử dụng. Khám phá vô vàn khả năng sáng tạo!
        </p>
        <Button 
          onClick={handleStart} 
          size="lg" 
          className="mt-8 px-8 py-3 text-lg font-semibold transition-all duration-300 rounded-md"
        >
          Bắt đầu
        </Button>
      </div>

      <div className="mt-12 w-full z-10"> 
        <LandingPagePresetCarousel />
      </div>
    </div>
  );
};

export default LandingPage;