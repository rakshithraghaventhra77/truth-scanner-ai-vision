import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ProductUrlInput } from './ProductUrlInput';
import { ManualInput } from './ManualInput';
import { LoadingAnimation } from './LoadingAnimation';
import { ResultDisplay } from './ResultDisplay';
import { GalaxyBackground } from './GalaxyBackground';
import { Shield, Bot } from 'lucide-react';

export interface AnalysisResult {
  detectedLogo?: string;
  suspiciousPrice: boolean;
  fakeReviewProbability: number;
  verdict: 'genuine' | 'counterfeit' | 'suspicious';
  confidence: number;
  details: string[];
}

export const CounterfeitDetector = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'url' | 'manual'>('url');

  const handleAnalysis = async (data: any) => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      // Mock analysis result
      const mockResult: AnalysisResult = {
        detectedLogo: 'Nike',
        suspiciousPrice: Math.random() > 0.5,
        fakeReviewProbability: Math.random() * 100,
        verdict: Math.random() > 0.6 ? 'genuine' : Math.random() > 0.3 ? 'counterfeit' : 'suspicious',
        confidence: 70 + Math.random() * 30,
        details: [
          'Logo analysis completed',
          'Price comparison with market average',
          'Review pattern analysis',
          'Image authenticity verification'
        ]
      };
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative p-6">
      <GalaxyBackground />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              className="p-3 bg-gradient-ai rounded-full shadow-ai"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 30px hsl(217 91% 60% / 0.6)",
                rotate: 360 
              }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              AI Counterfeit Detector
            </motion.h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered analysis to detect counterfeit products. Upload product details or paste a link to get started.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <Card className="shadow-ai border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-card-hover transition-all duration-500 hover:bg-card/90">
            <CardContent className="p-8">
              {!isAnalyzing && !result && (
                <>
                  {/* Tab Selection */}
                  <div className="flex gap-2 mb-8 p-1 bg-muted rounded-lg">
                    <motion.button
                      onClick={() => setActiveTab('url')}
                      className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 font-medium ${
                        activeTab === 'url'
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔗 Product Link
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveTab('manual')}
                      className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 font-medium ${
                        activeTab === 'manual'
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      📝 Manual Input
                    </motion.button>
                  </div>

                  {/* Input Forms */}
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'url' ? (
                      <ProductUrlInput onSubmit={handleAnalysis} />
                    ) : (
                      <ManualInput onSubmit={handleAnalysis} />
                    )}
                  </motion.div>
                </>
              )}

              {isAnalyzing && <LoadingAnimation />}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResultDisplay result={result} onReset={() => {
                    setResult(null);
                    setIsAnalyzing(false);
                  }} />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-8 text-muted-foreground"
        >
          <Bot className="w-4 h-4" />
          <span className="text-sm">Powered by Advanced AI Detection</span>
        </motion.div>
      </div>
    </div>
  );
};