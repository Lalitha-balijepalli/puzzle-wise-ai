
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, Zap, Type, Image, Mic } from 'lucide-react';
import ImageInput from './ImageInput';
import VoiceInput from './VoiceInput';

const PuzzleInput = ({ onSolve, isLoading }) => {
  const [puzzle, setPuzzle] = useState('');
  const [puzzleType, setPuzzleType] = useState('logic');
  const [inputMethod, setInputMethod] = useState('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (puzzle.trim() && !isLoading) {
      onSolve(puzzle.trim());
    }
  };

  const handleImageUpload = (extractedText) => {
    setPuzzle(extractedText);
  };

  const handleVoiceTranscription = (transcription) => {
    setPuzzle(transcription);
  };

  const puzzleTypes = [
    { value: 'logic', label: 'Logical Reasoning' },
    { value: 'riddle', label: 'Riddles' },
    { value: 'math', label: 'Math Word Problems' },
    { value: 'pattern', label: 'Pattern Recognition' },
    { value: 'deduction', label: 'Deduction Puzzles' }
  ];

  const inputMethods = [
    { value: 'text', label: 'Text', icon: Type },
    { value: 'image', label: 'Image', icon: Image },
    { value: 'voice', label: 'Voice', icon: Mic }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Puzzle Type
        </label>
        <Select value={puzzleType} onValueChange={setPuzzleType}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            {puzzleTypes.map((type) => (
              <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-600">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Input Method
        </label>
        <RadioGroup
          value={inputMethod}
          onValueChange={setInputMethod}
          className="flex flex-row space-x-6"
        >
          {inputMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div key={method.value} className="flex items-center space-x-2">
                <RadioGroupItem value={method.value} id={method.value} />
                <Label 
                  htmlFor={method.value} 
                  className="flex items-center gap-2 text-slate-300 cursor-pointer"
                >
                  <IconComponent className="w-4 h-4" />
                  {method.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Your Puzzle
        </label>
        
        {inputMethod === 'text' && (
          <Textarea
            value={puzzle}
            onChange={(e) => setPuzzle(e.target.value)}
            placeholder="Enter your puzzle here... For example: 'A man lives on the 20th floor of an apartment building. Every morning he takes the elevator down to the ground floor. When he comes home, he takes the elevator to the 10th floor and walks the rest of the way... except on rainy days, when he takes the elevator all the way to the 20th floor. Why?'"
            className="min-h-[120px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            disabled={isLoading}
          />
        )}

        {inputMethod === 'image' && (
          <ImageInput 
            onImageUpload={handleImageUpload}
            disabled={isLoading}
          />
        )}

        {inputMethod === 'voice' && (
          <VoiceInput 
            onTranscription={handleVoiceTranscription}
            disabled={isLoading}
          />
        )}

        {puzzle && inputMethod !== 'text' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Extracted/Transcribed Text
            </label>
            <Textarea
              value={puzzle}
              onChange={(e) => setPuzzle(e.target.value)}
              className="min-h-[80px] bg-slate-700 border-slate-600 text-white resize-none"
              disabled={isLoading}
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={!puzzle.trim() || isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            AI is thinking...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 mr-2" />
            Solve Puzzle
          </>
        )}
      </Button>
    </form>
  );
};

export default PuzzleInput;
