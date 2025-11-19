
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Target, Brain } from 'lucide-react';

const PuzzleExamples = ({ onSelectExample }) => {
  const examples = [
    {
      icon: Brain,
      title: "Classic Logic Puzzle",
      description: "The man and the elevator",
      puzzle: "A man lives on the 20th floor of an apartment building. Every morning he takes the elevator down to the ground floor. When he comes home, he takes the elevator to the 10th floor and walks the rest of the way... except on rainy days, when he takes the elevator all the way to the 20th floor. Why?",
      difficulty: "Medium",
      color: "text-blue-400"
    },
    {
      icon: Lightbulb,
      title: "Family Riddle",
      description: "The mysterious photograph",
      puzzle: "A man is looking at a picture of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the picture?",
      difficulty: "Hard",
      color: "text-yellow-400"
    },
    {
      icon: Target,
      title: "Math Logic",
      description: "The birthday paradox",
      puzzle: "In a room of 30 people, what's the probability that at least two people share the same birthday? Explain the reasoning step by step.",
      difficulty: "Expert",
      color: "text-purple-400"
    }
  ];

  return (
    <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        Try These Examples
      </h3>
      
      <div className="space-y-4">
        {examples.map((example, index) => {
          const IconComponent = example.icon;
          return (
            <div
              key={index}
              className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <IconComponent className={`w-5 h-5 ${example.color} mt-1 flex-shrink-0`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white">{example.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      example.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                      example.difficulty === 'Hard' ? 'bg-orange-600/20 text-orange-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {example.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{example.description}</p>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-3">
                    {example.puzzle}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onSelectExample(example.puzzle)}
                variant="outline"
                size="sm"
                className="w-full bg-slate-600 border-slate-500 text-white hover:bg-slate-500"
              >
                Try This Puzzle
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PuzzleExamples;
