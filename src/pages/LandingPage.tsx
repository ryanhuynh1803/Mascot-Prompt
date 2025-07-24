import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LandingPagePresetCarousel } from '@/components/LandingPagePresetCarousel';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Ẩn con trỏ mặc định
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dọn dẹp: khôi phục con trỏ mặc định và xóa trình nghe sự kiện
    return () => {
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleStart = () => {
    navigate('/generator');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 md:p-6 text-center animate-fade-in relative overflow-hidden">
      {/* Phần tử đóm sáng */}
      {/* Đã thay đổi z-[9999] thành z-0 */}
      {/* Đã thay đổi w-8 h-8 thành w-16 h-16 */}
      <div
        className="fixed w-16 h-16 rounded-full pointer-events-none z-0 transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(255, 192, 203, 0.6) 0%, rgba(255, 192, 203, 0) 70%)',
          boxShadow: '0 0 25px 10px rgba(255, 192, 203, 0.4)' // Đã tăng kích thước bóng đổ
        }}
      />

      <div className="max-w-3xl mx-auto space-y-6 z-10"> {/* Đảm bảo nội dung nằm trên đóm sáng */}
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