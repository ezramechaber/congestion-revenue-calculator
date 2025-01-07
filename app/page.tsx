'use client';
import React, { useState, useEffect } from 'react';

const RevenueCounter = () => {
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const REVENUE_PER_SECOND = 15.85;
  const START_DATE = new Date('2025-01-05T05:00:00.000Z'); // 12AM ET (5AM UTC)

  useEffect(() => {
    const calculateRevenue = () => {
      const now = new Date();
      const secondsElapsed = (now.getTime() - START_DATE.getTime()) / 1000;
      const revenue = Math.max(0, secondsElapsed * REVENUE_PER_SECOND);
      setCurrentRevenue(revenue);
    };

    calculateRevenue();
    const interval = setInterval(calculateRevenue, 100);
    return () => clearInterval(interval);
  }, [START_DATE]);

  const formatRevenue = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleShare = (platform: 'twitter' | 'threads' | 'bluesky') => {
    const text = `NYC's congestion pricing is projected to have raised ${formatRevenue(currentRevenue)} for the MTA since January 5`;
    const url = window.location.href;
    let shareUrl;

    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'threads':
        shareUrl = `https://www.threads.net/intent/post?url=${encodeURIComponent(url)}`;
        break;
      case 'bluesky':
        const bskyText = `${text}\n\n${url}`;
        if (bskyText.length > 300) {
          const truncatedText = bskyText.slice(0, 297) + '...';
          shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(truncatedText)}`;
        } else {
          shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(bskyText)}`;
        }
        break;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-2xl mx-auto p-8 space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
            Congestion Zone Revenue Calculator
          </h1>
          <div className="space-y-4">
            <p className="text-3xl text-center">💸🚗🗽</p>
            <p className="text-xl md:text-2xl text-center text-gray-700 leading-relaxed">
              Project how much money NYC has raised for the MTA since congestion pricing went into effect on January 5, 2025.
            </p>
          </div>
        </header>

        <div className="bg-white border border-black py-8 px-6 sm:px-12 space-y-6">
          <div className="font-mono text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-center text-green-600 tabular-nums">
            {formatRevenue(currentRevenue)}
          </div>
          <div className="text-base md:text-lg text-center text-gray-600">
            Growing by <span className="font-mono font-semibold">{formatRevenue(REVENUE_PER_SECOND)}</span> every second
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleShare('bluesky')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 transition-colors border border-black min-w-[120px] justify-center"
          >
            <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 text-[#0085FF]">
              <title>Bluesky</title>
              <path fill="currentColor" d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
            </svg>
            <span>Bluesky</span>
          </button>
          <button
            onClick={() => handleShare('threads')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 transition-colors border border-black min-w-[120px] justify-center"
          >
            <svg role="img" viewBox="0 0 24 24" className="w-5 h-5">
              <title>Threads</title>
              <path fill="currentColor" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>
            </svg>
            <span>Threads</span>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 transition-colors border border-black min-w-[120px] justify-center"
          >
            <svg role="img" viewBox="0 0 24 24" className="w-5 h-5">
              <title>X</title>
              <path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>
            <span>X</span>
          </button>
        </div>

        <footer className="text-sm md:text-base text-gray-600 space-y-3">
        <p className="leading-relaxed"><strong>How is this calculated?</strong></p>
          <p className="leading-relaxed">
            Revenue per second calculated at an average of $15.85 based on the{' '}
            <a href="https://www.nytimes.com/2025/01/05/nyregion/nyc-congestion-pricing-tolls.html?unlocked_article_code=1.nE4.bvBR.7CgA_PlYRmMj&smid=url-share" 
               className="text-blue-600 hover:underline">
              NYT&apos;s reporting of $500 million annually
            </a>
            . This is a linear projection, and doesn&apos;t take into account peak vs. off-peak, holidays or rush hour, etc.</p>
          <p className="leading-relaxed">
          {' '}<a href="https://www.congestionrevenue.nyc/" 
               className="text-blue-600 hover:underline">See the project on GitHub</a>
              
              {' '}| Created by{' '}
            <a href="https://www.ezramechaber.com" 
               className="text-blue-600 hover:underline">
              Ezra Mechaber
            </a>
            
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RevenueCounter;