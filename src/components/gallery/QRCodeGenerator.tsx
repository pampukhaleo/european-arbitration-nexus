
import React from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator = ({ url, size = 200 }: QRCodeGeneratorProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  };

  const openLink = () => {
    window.open(url, '_blank');
  };

  return (
    <Card className="w-fit">
      <CardContent className="p-4">
        <div className="text-center space-y-4">
          <div className="bg-white p-2 rounded border">
            <QRCode
              value={url}
              size={size}
              level="M"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              QR Code for Private Access
            </p>
            
            <div className="text-xs text-muted-foreground break-all max-w-[200px]">
              {url}
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openLink}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Open
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
