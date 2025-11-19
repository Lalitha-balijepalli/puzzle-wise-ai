
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Square, Play, Loader2 } from 'lucide-react';

const VoiceInput = ({ onTranscription, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const processAudio = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate speech-to-text processing
      // In a real app, you'd use a service like Google Speech-to-Text, 
      // OpenAI Whisper API, or Web Speech API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock transcription - replace with actual speech-to-text implementation
      const mockTranscription = "Three friends check into a hotel room that costs $30. They each contribute $10. Later, the hotel clerk realizes the room only costs $25 and gives $5 to the bellboy to return. The bellboy keeps $2 and gives $1 back to each friend. Now each friend has paid $9, totaling $27, plus the bellboy's $2 equals $29. Where did the missing dollar go?";
      
      onTranscription(mockTranscription);
    } catch (error) {
      console.error('Error processing audio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    audioChunksRef.current = [];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-700/50 border-slate-600 p-6">
        <div className="text-center space-y-4">
          {!isRecording && !audioBlob && (
            <>
              <Mic className="w-16 h-16 text-slate-400 mx-auto" />
              <p className="text-slate-300">Click to start recording your puzzle</p>
              <Button
                onClick={startRecording}
                disabled={disabled}
                className="bg-red-600 hover:bg-red-700"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            </>
          )}

          {isRecording && (
            <>
              <div className="relative">
                <Mic className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                <div className="absolute -inset-4 border-2 border-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <p className="text-red-400 font-medium">Recording in progress...</p>
              <div className="text-2xl font-mono text-white">
                {formatTime(recordingTime)}
              </div>
              <Button
                onClick={stopRecording}
                className="bg-gray-600 hover:bg-gray-700"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            </>
          )}

          {audioBlob && !isRecording && (
            <>
              <MicOff className="w-16 h-16 text-green-500 mx-auto" />
              <p className="text-green-400">Recording completed ({formatTime(recordingTime)})</p>
              
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={playAudio}
                  disabled={disabled}
                  className="border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetRecording}
                  disabled={disabled || isProcessing}
                  className="border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  Record Again
                </Button>
              </div>

              <Button
                onClick={processAudio}
                disabled={disabled || isProcessing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Converting to text...
                  </>
                ) : (
                  'Convert to Text'
                )}
              </Button>
            </>
          )}
        </div>
      </Card>

      {(isRecording || audioBlob) && (
        <div className="text-center text-sm text-slate-400">
          <p>Speak clearly and include all puzzle details for best results</p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
