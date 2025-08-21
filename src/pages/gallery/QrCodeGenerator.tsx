
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QRCodeGenerator from '@/components/gallery/QRCodeGenerator';

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>QR Code Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <QRCodeGenerator url={`https://fwwpidktaanowpaihgzy.supabase.co/gallery/${id}`} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QrCodeGenerator;
