'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { getDiseaseDetection } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, X, ShieldCheck, Loader2, Wand2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2" />
          Detect Disease
        </>
      )}
    </Button>
  );
}

export default function DiseaseDetectionPage() {
  const initialState = { error: '', data: undefined };
  const [state, dispatch] = useFormState(getDiseaseDetection, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if(hiddenInputRef.current) {
        hiddenInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header title="Disease Scanner" />
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex items-start justify-center">
        <div className="w-full max-w-2xl grid gap-8">
           <Card>
            <CardHeader>
              <CardTitle>Upload Leaf Image</CardTitle>
              <CardDescription>
                Upload an image of a plant leaf to detect potential diseases using our AI model.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={dispatch} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="file:text-primary file:font-medium"
                    />
                    <Input type="hidden" name="photoDataUri" ref={hiddenInputRef} />
                </div>
                {preview && (
                  <div className="relative group aspect-video w-full rounded-md overflow-hidden border">
                    <Image src={preview} alt="Image preview" fill className="object-contain" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={clearPreview}
                    >
                      <X />
                    </Button>
                  </div>
                )}
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
          
          {state.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state.data && (
            <Card className="bg-green-50 dark:bg-green-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-primary"/>
                    Analysis Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 rounded-lg bg-primary/10">
                    <p className="text-2xl font-bold text-primary">
                        {state.data.predictedDisease}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Confidence: {(state.data.confidence * 100).toFixed(0)}%
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">Explanation</h3>
                    <p className="text-muted-foreground text-sm mt-1">{state.data.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
}
