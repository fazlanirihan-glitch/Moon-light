'use client';

import { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import BackButton from '@/components/shared/BackButton';
import ZenCroFooter from '@/components/shared/ZenCroFooter';

export default function QRPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [currentOrigin, setCurrentOrigin] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://chiplun-order.vercel.app';
    setCurrentOrigin(origin);
    const orderUrl = `${origin}/order`;

    QRCode.toDataURL(orderUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1C1917',
        light: '#FFFFFF',
      },
    }).then((url) => {
      setQrDataUrl(url);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'chiplun-restaurants-order-qr.png';
    a.click();
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto flex flex-col justify-between">
      <div>
        <div className="no-print">
          <BackButton />
        </div>

        {/* Printable Standee Card */}
        <div className="mt-4 bg-white border-2 border-stone-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl print:shadow-none print:border-4 print:m-0">
          <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
            Digital Food Ordering
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
            SCAN & ORDER
          </h1>
          <p className="text-stone-600 text-sm mt-1 font-medium">
            Browse Menu & Order on WhatsApp
          </p>

          {/* Restaurant badges */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-stone-800">
            <span className="bg-stone-100 px-2.5 py-1 rounded-lg">🌙 Moonlight Cafe</span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-lg">🍗 Fakta Biriyani</span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-lg">☁️ Shalimar</span>
          </div>

          {/* QR Code Container */}
          <div className="my-6 p-4 bg-stone-50 border border-stone-200 rounded-2xl inline-block shadow-inner">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="Scan to order from Chiplun restaurants"
                className="w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-stone-400 text-sm">
                Generating QR...
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <p className="text-xs font-mono text-stone-500 break-all px-4">
            {currentOrigin ? `${currentOrigin}/order` : '/order'}
          </p>

          <p className="text-xs text-stone-500 mt-2 font-medium">
            Point camera at QR code • No app download required
          </p>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 no-print">
          <button
            onClick={handlePrint}
            className="flex-1 py-3.5 px-4 bg-stone-950 text-white font-bold rounded-2xl text-sm hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>🖨️</span>
            <span>Print Standee / Sticker</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-3.5 px-4 bg-white border border-stone-300 text-stone-800 font-bold rounded-2xl text-sm hover:bg-stone-100 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>⬇️</span>
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      <div className="no-print mt-8">
        <ZenCroFooter />
      </div>
    </div>
  );
}
