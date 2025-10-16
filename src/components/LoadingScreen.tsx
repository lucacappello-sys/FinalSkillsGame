/**
 * Loading Screen Component
 * 
 * Displays an animated progress bar while "calculating" results.
 * Provides visual feedback during the transition from skill selection to results.
 * Progress bar animates from 0% to 100% over 3 seconds.
 */

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void; // Callback triggered when loading completes
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  // Track progress percentage (0-100)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // Total loading duration in milliseconds
    const interval = 50; // Update progress every 50ms for smooth animation
    const increment = (interval / duration) * 100; // Calculate progress increment per interval

    // Set up interval to update progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200); // Brief delay before showing results
          return 100;
        }
        return next;
      });
    }, interval);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="size-full flex items-center justify-center bg-white">
      <div className="max-w-2xl w-full px-8">
        <h2 className="text-[#2C3E50] text-center mb-8">Loading results...</h2>
        
        <div className="w-full bg-[#D8DCE6] rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-[#5DADE2] transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
