
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator = ({ url, size = 200 }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR code placeholder - in production, use a QR code library
    const generateQRCode = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);
      
      ctx.fillStyle = '#ffffff';
      const cellSize = size / 25;
      
      // Create a simple pattern that looks like a QR code
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
      
      // Add corner squares (typical QR code pattern)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cellSize * 7, cellSize * 7);
      ctx.fillRect(size - cellSize * 7, 0, cellSize * 7, cellSize * 7);
      ctx.fillRect(0, size - cellSize * 7, cellSize * 7, cellSize * 7);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cellSize, cellSize, cellSize * 5, cellSize * 5);
      ctx.fillRect(size - cellSize * 6, cellSize, cellSize * 5, cellSize * 5);
      ctx.fillRect(cellSize, size - cellSize * 6, cellSize * 5, cellSize * 5);
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(cellSize * 2, cellSize * 2, cellSize * 3, cellSize * 3);
      ctx.fillRect(size - cellSize * 5, cellSize * 2, cellSize * 3, cellSize * 3);
      ctx.fillRect(cellSize * 2, size - cellSize * 5, cellSize * 3, cellSize * 3);
    };

    generateQRCode();
  }, [url, size]);

  return (
    <Card className="w-fit">
      <CardContent className="p-4">
        <div className="text-center space-y-2">
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className="border rounded"
          />
          <p className="text-xs text-muted-foreground">
            QR Code for Private Access
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
