import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, Search } from 'lucide-react';

interface ProductUrlInputProps {
  onSubmit: (data: { url: string }) => void;
}

export const ProductUrlInput: React.FC<ProductUrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValid(false);
      return;
    }

    if (!validateUrl(url)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onSubmit({ url });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (!isValid && value.trim()) {
      setIsValid(validateUrl(value));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2 p-4 bg-gradient-ai rounded-full mb-4 shadow-glow">
          <Link className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Product Link Analysis</h3>
        <p className="text-muted-foreground">
          Paste a product URL from any e-commerce platform for automatic analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-url" className="text-base font-medium">
            Product URL
          </Label>
          <div className="relative">
            <Input
              id="product-url"
              type="url"
              placeholder="https://example.com/product/..."
              value={url}
              onChange={handleUrlChange}
              className={`pr-12 h-12 ${!isValid ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
            <Link className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          {!isValid && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              Please enter a valid URL
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-12 bg-gradient-ai hover:opacity-90 transition-opacity font-medium"
          disabled={!url.trim()}
        >
          <Search className="w-4 h-4 mr-2" />
          Fetch & Analyze Product
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-ai-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-ai-primary font-bold">1</span>
          </div>
          <p className="text-sm font-medium mb-1">Auto-Fetch</p>
          <p className="text-xs text-muted-foreground">Extract product details automatically</p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-ai-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-ai-secondary font-bold">2</span>
          </div>
          <p className="text-sm font-medium mb-1">AI Analysis</p>
          <p className="text-xs text-muted-foreground">Deep learning detection algorithms</p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-success font-bold">3</span>
          </div>
          <p className="text-sm font-medium mb-1">Results</p>
          <p className="text-xs text-muted-foreground">Comprehensive authenticity report</p>
        </div>
      </div>
    </motion.div>
  );
};