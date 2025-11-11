'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDetections, mockRecommendations } from '@/lib/placeholder-data';
import { Bot, ShieldCheck, Leaf, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const latestRecommendation = mockRecommendations[0];
  const latestDetection = mockDetections[0];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6 md:p-8 grid gap-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                <span>Latest Crop Recommendation</span>
              </CardTitle>
              <CardDescription>
                AI-powered suggestion based on the latest sensor data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-4xl font-bold text-primary flex items-center gap-2">
                  <Leaf className="w-8 h-8" />
                  {latestRecommendation.recommendedCrop}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Confidence: {(latestRecommendation.confidence * 100).toFixed(0)}%
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {latestRecommendation.explanation}
              </p>
              <Link href="/dashboard/recommendations">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="mr-2" />
                  Get New Recommendation
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-destructive" />
                <span>Last Disease Scan</span>
              </CardTitle>
              <CardDescription>
                The most recent plant disease analysis from an uploaded image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <Image
                  src={latestDetection.imageUrl}
                  alt={latestDetection.predictedDisease}
                  fill
                  className="object-cover"
                  data-ai-hint="diseased leaf"
                />
              </div>
              <div className="p-4 rounded-lg bg-destructive/10">
                <p className="text-xl font-bold text-destructive">
                  {latestDetection.predictedDisease}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Confidence: {(latestDetection.confidence * 100).toFixed(0)}%
                </p>
              </div>
               <Link href="/dashboard/disease-detection">
                <Button variant="outline" className="w-full">
                  <ShieldCheck className="mr-2" />
                  Scan New Image
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
