import React, { useState } from 'react';
import { Lightbulb, Brain, Puzzle, ArrowRight, Stars, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PuzzleInput from '@/components/PuzzleInput';
import SolutionDisplay from '@/components/SolutionDisplay';
import PuzzleExamples from '@/components/PuzzleExamples';
import ReasoningSteps from '@/components/ReasoningSteps';

const Index = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState('');
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [puzzleHistory, setPuzzleHistory] = useState([]);

  const generateSolution = (puzzle) => {
    const lowerPuzzle = puzzle.toLowerCase().trim();
    console.log('Analyzing puzzle:', lowerPuzzle);
    
    // Elevator/Height Puzzle
    if (lowerPuzzle.includes('elevator') && (lowerPuzzle.includes('20th floor') || lowerPuzzle.includes('twentieth floor')) && lowerPuzzle.includes('10th floor')) {
      return {
        answer: "The man is too short to reach the button for the 20th floor. On rainy days, he has an umbrella which he uses to press the higher button.",
        reasoning: [
          "The man lives on the 20th floor and always takes the elevator down in the morning",
          "When returning home, he only goes to the 10th floor and walks the rest",
          "Exception: On rainy days, he goes directly to the 20th floor",
          "The key difference is what he has on rainy days - an umbrella",
          "The man is too short to reach the 20th floor button normally",
          "He uses his umbrella to press the 20th floor button on rainy days"
        ],
        confidence: 98,
        puzzleType: "Logic Puzzle"
      };
    }
    
    // Father and Son Picture Puzzle
    if ((lowerPuzzle.includes('father') && lowerPuzzle.includes('son') && lowerPuzzle.includes('picture')) || 
        (lowerPuzzle.includes('brothers and sisters') && lowerPuzzle.includes('none') && lowerPuzzle.includes('father\'s son'))) {
      return {
        answer: "The man in the picture is the speaker's son.",
        reasoning: [
          "The man says: 'Brothers and sisters, I have none'",
          "This means he has no siblings at all",
          "He then says: 'But that man's father is my father's son'",
          "Since he has no brothers, 'my father's son' can only refer to himself",
          "So 'that man's father' is the speaker himself",
          "Therefore, the man in the picture is the speaker's son"
        ],
        confidence: 99,
        puzzleType: "Family Riddle"
      };
    }
    
    // Birthday Paradox
    if (lowerPuzzle.includes('birthday') && (lowerPuzzle.includes('30 people') || lowerPuzzle.includes('thirty people'))) {
      return {
        answer: "The probability is approximately 70.6% (about 7 in 10 chance).",
        reasoning: [
          "This is the famous birthday paradox - counterintuitive but mathematically correct",
          "We calculate the probability that NO two people share a birthday, then subtract from 1",
          "First person: 365/365 chance of unique birthday",
          "Second person: 364/365 chance of different birthday",
          "Continue this pattern: 363/365, 362/365, ..., 336/365",
          "Multiply all probabilities: ≈ 0.294 (29.4% chance all different)",
          "Therefore: 1 - 0.294 = 0.706 or 70.6% chance at least 2 people share a birthday"
        ],
        confidence: 100,
        puzzleType: "Probability"
      };
    }
    
    // Sheep Math Puzzle
    if (lowerPuzzle.includes('sheep') && lowerPuzzle.includes('17') && lowerPuzzle.includes('all but')) {
      return {
        answer: "9 sheep remain alive.",
        reasoning: [
          "The puzzle states: 'A farmer has 17 sheep, and all but 9 die'",
          "The phrase 'all but 9' means 'all except 9'",
          "If all sheep except 9 die, then 9 sheep survive",
          "The total number 17 is irrelevant to the final answer",
          "Only the number that survive matters: 9 sheep"
        ],
        confidence: 100,
        puzzleType: "Word Puzzle"
      };
    }
    
    // Missing Dollar Hotel Puzzle
    if (lowerPuzzle.includes('hotel') && lowerPuzzle.includes('30') && (lowerPuzzle.includes('missing') || lowerPuzzle.includes('bellboy'))) {
      return {
        answer: "There is no missing dollar. The puzzle contains a mathematical misdirection.",
        reasoning: [
          "Three friends pay $30 for a hotel room ($10 each)",
          "Manager reduces price to $25, gives bellboy $5 to return",
          "Bellboy keeps $2, returns $3 ($1 to each friend)",
          "Each friend effectively paid $9, total $27",
          "ERROR in puzzle: $27 + $2 = $29, where's the $30th dollar?",
          "CORRECT math: $27 paid = $25 (hotel) + $2 (bellboy)",
          "The $27 includes the bellboy's $2, don't add it again!"
        ],
        confidence: 100,
        puzzleType: "Math Logic"
      };
    }
    
    // Monty Hall Problem
    if (lowerPuzzle.includes('monty hall') || (lowerPuzzle.includes('three doors') && lowerPuzzle.includes('car') && lowerPuzzle.includes('goat'))) {
      return {
        answer: "Yes, you should switch doors. Your probability of winning increases from 1/3 to 2/3.",
        reasoning: [
          "Initially, you have a 1/3 chance of picking the car, 2/3 chance it's behind another door",
          "When the host opens a door with a goat, they don't change these initial probabilities",
          "Your original door still has a 1/3 probability of having the car",
          "The remaining unopened door now has a 2/3 probability",
          "By switching, you're betting on the 2/3 probability rather than 1/3",
          "Switching doubles your chances of winning from 33.3% to 66.7%"
        ],
        confidence: 100,
        puzzleType: "Probability"
      };
    }
    
    // Two Coins Puzzle
    if (lowerPuzzle.includes('two coins') && lowerPuzzle.includes('30 cents') && lowerPuzzle.includes('nickel')) {
      return {
        answer: "A quarter (25 cents) and a nickel (5 cents).",
        reasoning: [
          "The puzzle states: 'Two coins total 30 cents, one is not a nickel'",
          "Key insight: ONE coin is not a nickel, but the OTHER can be",
          "Solution: Quarter (25¢) + Nickel (5¢) = 30¢",
          "The quarter is not a nickel (satisfying the constraint)",
          "The nickel is indeed a nickel (but the constraint only applies to one coin)"
        ],
        confidence: 100,
        puzzleType: "Word Logic"
      };
    }
    
    // River Crossing Puzzle
    if (lowerPuzzle.includes('farmer') && lowerPuzzle.includes('fox') && lowerPuzzle.includes('chicken') && lowerPuzzle.includes('corn')) {
      return {
        answer: "1) Take chicken across, 2) Return alone, 3) Take fox across, bring chicken back, 4) Leave chicken, take corn across, 5) Return alone, 6) Take chicken across.",
        reasoning: [
          "The farmer can only take one item at a time across the river",
          "Fox will eat chicken if left alone, chicken will eat corn if left alone",
          "Step 1: Take chicken across (fox and corn safe together)",
          "Step 2: Return alone, leaving chicken on far side",
          "Step 3: Take fox across, but bring chicken back to prevent fox eating chicken",
          "Step 4: Leave chicken on original side, take corn across (fox and corn safe)",
          "Step 5: Return alone, leaving fox and corn safely together",
          "Step 6: Take chicken across - all items now safely transported"
        ],
        confidence: 99,
        puzzleType: "Logic Puzzle"
      };
    }
    
    // Default for unrecognized puzzles
    return {
      answer: "I need more context to solve this puzzle accurately. Could you provide the complete puzzle statement or rephrase it?",
      reasoning: [
        "The puzzle you've entered doesn't match any of the classic puzzles I recognize",
        "To provide an exact answer, I need clearer details about the problem",
        "Try rephrasing the puzzle or providing more specific information",
        "Include all relevant constraints and conditions",
        "Make sure the puzzle statement is complete and unambiguous"
      ],
      confidence: 50,
      puzzleType: "Unknown"
    };
  };

  const handleSolvePuzzle = async (puzzle) => {
    setIsLoading(true);
    setCurrentPuzzle(puzzle);
    setSolution(null);
    
    console.log('Solving puzzle:', puzzle);
    
    // Simulate AI processing time
    setTimeout(() => {
      const generatedSolution = generateSolution(puzzle);
      console.log('Generated solution:', generatedSolution);
      
      setSolution(generatedSolution);
      setPuzzleHistory(prev => [...prev, { puzzle, solution: generatedSolution, timestamp: Date.now() }]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSelectExample = (examplePuzzle) => {
    console.log('Example selected:', examplePuzzle);
    handleSolvePuzzle(examplePuzzle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Brain className="w-16 h-16 text-blue-400 animate-pulse" />
                <Puzzle className="w-8 h-8 text-purple-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              AI Puzzle Solver
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Unleash the power of artificial intelligence to solve the most challenging logical puzzles, 
              riddles, and reasoning problems with step-by-step explanations.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-slate-300">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span>Logical Reasoning</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Target className="w-5 h-5 text-green-400" />
                <span>Pattern Recognition</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Stars className="w-5 h-5 text-purple-400" />
                <span>Complex Riddles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Input */}
          <div className="space-y-8">
            <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Puzzle className="w-6 h-6 text-purple-400" />
                Enter Your Puzzle
              </h2>
              <PuzzleInput onSolve={handleSolvePuzzle} isLoading={isLoading} />
            </Card>

            <PuzzleExamples onSelectExample={handleSelectExample} />
          </div>

          {/* Right Column - Solution */}
          <div className="space-y-8">
            {solution ? (
              <>
                <SolutionDisplay solution={solution} puzzle={currentPuzzle} />
                <ReasoningSteps steps={solution.reasoning} />
              </>
            ) : (
              <Card className="p-8 bg-slate-800/30 border-slate-700 backdrop-blur-sm text-center">
                <Brain className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">Ready to Solve</h3>
                <p className="text-slate-500">Enter a puzzle to see AI reasoning in action</p>
              </Card>
            )}
          </div>
        </div>

        {/* Puzzle History */}
        {puzzleHistory.length > 0 && (
          <div className="mt-16 max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              Recent Puzzles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {puzzleHistory.slice(-6).map((item, index) => (
                <Card key={index} className="p-4 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors cursor-pointer">
                  <p className="text-slate-300 text-sm mb-2 line-clamp-2">{item.puzzle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-xs text-green-400 font-medium">
                      {item.solution.confidence}% confidence
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
