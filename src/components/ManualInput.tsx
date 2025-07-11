import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, DollarSign, Star, Image as ImageIcon } from 'lucide-react';

interface ManualInputProps {
  onSubmit: (data: {
    image?: File;
    price: string;
    reviews: string;
    productName: string;
  }) => void;
}

export const ManualInput: React.FC<ManualInputProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    reviews: '',
    image: null as File | null
  });
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (file: File) => {
    setFormData(prev => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const isFormValid = formData.productName.trim() && formData.price.trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div 
          className="inline-flex items-center gap-2 p-4 bg-gradient-ai rounded-full mb-4 shadow-glow"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 50px hsl(217 91% 60% / 0.8)",
            rotate: [0, -5, 5, 0] 
          }}
          transition={{ duration: 0.5 }}
        >
          <Upload className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        <motion.h3 
          className="text-xl font-semibold mb-2"
          whileHover={{ scale: 1.05 }}
        >
          Manual Product Analysis
        </motion.h3>
        <p className="text-muted-foreground">
          Manually input product details for comprehensive authenticity analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="product-name" className="text-base font-medium">
            Product Name *
          </Label>
          <Input
            id="product-name"
            placeholder="e.g., Nike Air Max 270"
            value={formData.productName}
            onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
            className="h-12"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Product Image</Label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="max-h-40 mx-auto rounded-lg shadow-md"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: null }));
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium mb-1">Drop image here or click to upload</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Price and Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-base font-medium">
              Price *
            </Label>
            <div className="relative">
              <Input
                id="price"
                placeholder="99.99"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="pl-10 h-12"
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviews" className="text-base font-medium">
              Customer Reviews
            </Label>
            <Textarea
              id="reviews"
              placeholder="Paste some customer reviews here..."
              value={formData.reviews}
              onChange={(e) => setFormData(prev => ({ ...prev, reviews: e.target.value }))}
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-12 bg-gradient-ai hover:opacity-90 transition-opacity font-medium"
          disabled={!isFormValid}
        >
          <Star className="w-4 h-4 mr-2" />
          Analyze Product Details
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-ai-primary" />
            Visual Analysis
          </h4>
          <p className="text-sm text-muted-foreground">
            AI examines product images for logo authenticity, quality markers, and visual inconsistencies
          </p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-ai-secondary" />
            Price Intelligence
          </h4>
          <p className="text-sm text-muted-foreground">
            Compare pricing against market data to identify suspiciously low or high prices
          </p>
        </div>
      </div>
    </motion.div>
  );
};