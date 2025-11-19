
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Brain, TrendingUp } from 'lucide-react';

const SolutionDisplay = ({ solution, puzzle }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">Solution Found</h3>
        <Badge variant="secondary" className="ml-auto">
          {solution.puzzleType}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-300 mb-2">Original Puzzle:</h4>
          <p className="text-slate-400 text-sm bg-slate-800/50 p-3 rounded-lg italic">
            "{puzzle}"
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-300 mb-2">Answer:</h4>
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-4 rounded-lg border border-green-500/30">
            <p className="text-white font-medium text-lg">{solution.answer}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">Confidence:</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getConfidenceColor(solution.confidence)} transition-all duration-1000`}
                  style={{ width: `${solution.confidence}%` }}
                />
              </div>
              <span className="text-sm font-medium text-white">{solution.confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SolutionDisplay;
