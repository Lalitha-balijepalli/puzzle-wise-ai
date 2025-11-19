
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ReasoningSteps = ({ steps }) => {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSteps(prev => {
        if (prev < steps.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <ArrowRight className="w-6 h-6 text-blue-400" />
        AI Reasoning Process
      </h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 transition-all duration-500 ${
              index < visibleSteps 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-4'
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {index < visibleSteps ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-slate-400">
                  Step {index + 1}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{step}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleSteps === steps.length && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30 animate-pulse">
          <p className="text-green-400 font-medium text-center">
            ✨ Reasoning complete! Solution verified with high confidence.
          </p>
        </div>
      )}
    </Card>
  );
};

export default ReasoningSteps;
