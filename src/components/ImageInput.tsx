
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, X, FileImage, Loader2 } from 'lucide-react';

const ImageInput = ({ onImageUpload, disabled }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageProcess = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate OCR processing - in a real app, you'd use an OCR service
      // like Google Vision API, Tesseract.js, or similar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted text - replace with actual OCR implementation
      const mockExtractedText = "A farmer has 17 sheep, and all but 9 die. How many are left?";
      
      onImageUpload(mockExtractedText);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      {!selectedImage ? (
        <Card 
          className="border-2 border-dashed border-slate-600 bg-slate-700/30 p-8 text-center hover:border-slate-500 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileImage className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 mb-2">
            Click to upload or drag and drop an image
          </p>
          <p className="text-slate-500 text-sm">
            PNG, JPG, or GIF up to 10MB
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={disabled}
          />
        </Card>
      ) : (
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="flex items-start gap-4">
            {preview && (
              <img 
                src={preview} 
                alt="Selected puzzle" 
                className="w-24 h-24 object-cover rounded-lg border border-slate-600"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-300 font-medium">{selectedImage.name}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={disabled || isProcessing}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-slate-500 text-sm mb-3">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button
                onClick={handleImageProcess}
                disabled={disabled || isProcessing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Extracting text...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Extract Text from Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageInput;
