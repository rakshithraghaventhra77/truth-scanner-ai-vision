import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  DollarSign, 
  MessageSquare,
  ArrowLeft,
  TrendingUp,
  Shield
} from 'lucide-react';
import { AnalysisResult } from './CounterfeitDetector';

interface ResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'genuine':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bg: 'bg-gradient-success',
          badge: 'bg-success/20 text-success border-success/30',
          title: 'Product Appears Genuine',
          description: 'Our AI analysis indicates this product is likely authentic'
        };
      case 'counterfeit':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bg: 'bg-gradient-danger',
          badge: 'bg-destructive/20 text-destructive border-destructive/30',
          title: 'Counterfeit Detected',
          description: 'Multiple red flags suggest this product may be fake'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bg: 'bg-gradient-warning',
          badge: 'bg-warning/20 text-warning border-warning/30',
          title: 'Requires Further Review',
          description: 'Some suspicious elements detected - proceed with caution'
        };
    }
  };

  const verdictConfig = getVerdictConfig(result.verdict);
  const VerdictIcon = verdictConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center gap-3 p-6 ${verdictConfig.bg} rounded-full mb-6 shadow-lg`}
        >
          <VerdictIcon className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mb-2"
        >
          {verdictConfig.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          {verdictConfig.description}
        </motion.p>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo Detection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-muted/30 rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-ai-primary/20 rounded-lg">
              <Eye className="w-5 h-5 text-ai-primary" />
            </div>
            <h3 className="font-semibold">Logo Detection</h3>
          </div>
          
          {result.detectedLogo ? (
            <div>
              <Badge variant="outline" className="mb-2">
                {result.detectedLogo}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Brand logo successfully identified and verified
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recognizable brand logo detected
            </p>
          )}
        </motion.div>

        {/* Price Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-muted/30 rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-ai-secondary/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-ai-secondary" />
            </div>
            <h3 className="font-semibold">Price Analysis</h3>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            {result.suspiciousPrice ? (
              <Badge className="bg-warning/20 text-warning border-warning/30">
                Suspicious
              </Badge>
            ) : (
              <Badge className="bg-success/20 text-success border-success/30">
                Normal Range
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {result.suspiciousPrice 
              ? 'Price significantly below market average'
              : 'Price within expected market range'
            }
          </p>
        </motion.div>

        {/* Review Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 bg-muted/30 rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-ai-accent/20 rounded-lg">
              <MessageSquare className="w-5 h-5 text-ai-accent" />
            </div>
            <h3 className="font-semibold">Review Analysis</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Fake Probability</span>
                <span className="text-sm font-bold">{Math.round(result.fakeReviewProbability)}%</span>
              </div>
              <Progress value={result.fakeReviewProbability} className="h-2" />
            </div>
            
            <p className="text-sm text-muted-foreground">
              {result.fakeReviewProbability > 70 
                ? 'High likelihood of fake reviews detected'
                : result.fakeReviewProbability > 40
                ? 'Some suspicious review patterns found'
                : 'Reviews appear authentic'
              }
            </p>
          </div>
        </motion.div>
      </div>

      {/* Confidence Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 bg-muted/30 rounded-xl border border-border/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold">Analysis Confidence</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Confidence</span>
            <Badge className={verdictConfig.badge}>
              {Math.round(result.confidence)}%
            </Badge>
          </div>
          
          <Progress value={result.confidence} className="h-3" />
          
          <p className="text-sm text-muted-foreground">
            Based on {result.details.length} analysis points including visual inspection, 
            pricing data, and review patterns.
          </p>
        </div>
      </motion.div>

      {/* Analysis Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="p-6 bg-muted/30 rounded-xl border border-border/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-success/20 rounded-lg">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <h3 className="font-semibold">Analysis Breakdown</h3>
        </div>
        
        <div className="space-y-2">
          {result.details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-background/50 rounded-lg"
            >
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span className="text-sm">{detail}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-4 justify-center pt-4"
      >
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="min-w-40"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Analyze Another
        </Button>
        
        <Button
          size="lg"
          className="min-w-40 bg-gradient-ai hover:opacity-90"
          onClick={() => {
            // Mock download report functionality
            console.log('Downloading detailed report...');
          }}
        >
          Download Report
        </Button>
      </motion.div>
    </motion.div>
  );
};