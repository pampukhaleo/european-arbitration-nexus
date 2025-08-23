
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QRCodeGenerator from '@/components/gallery/QRCodeGenerator';
import { getPublicBaseUrl } from '@/lib/publicBaseUrl';

const QrCodeGenerator = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p>Invalid painting ID</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const baseUrl = getPublicBaseUrl();
  const paintingUrl = `${baseUrl}/gallery/${id}`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>QR Code Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <QRCodeGenerator url={paintingUrl} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QrCodeGenerator;
