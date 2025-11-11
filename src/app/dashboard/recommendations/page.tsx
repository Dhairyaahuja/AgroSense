'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Header } from '@/components/layout/header';
import { getCropRecommendation } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, Leaf } from 'lucide-react';
import type { z } from 'zod';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Getting Recommendation...
        </>
      ) : (
        <>
          <Wand2 className="mr-2" />
          Recommend Crop
        </>
      )}
    </Button>
  );
}

type FormErrors = z.ZodError['formErrors'];

const SensorInput = ({ name, label, placeholder, defaultValue, formErrors }: { name: string, label: string, placeholder: string, defaultValue: string, formErrors?: FormErrors | undefined }) => {
    const id = name.toLowerCase();
    const errors = formErrors?.fieldErrors?.[name];
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={name} placeholder={placeholder} defaultValue={defaultValue} />
            {errors && <p className="text-xs text-destructive">{errors.join(', ')}</p>}
        </div>
    )
};


export default function RecommendationsPage() {
  const initialState = { error: '', formErrors: undefined, data: undefined };
  const [state, dispatch] = useFormState(getCropRecommendation, initialState);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header title="Crop AI" />
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex items-start justify-center">
        <div className="w-full max-w-2xl grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Data Input</CardTitle>
              <CardDescription>
                Enter the sensor readings from your farm to get an AI-powered crop recommendation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={dispatch} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SensorInput name="farmId" label="Farm ID" placeholder="e.g., farm-123" defaultValue="" formErrors={state.formErrors} />
                <SensorInput name="N" label="Nitrogen (N)" placeholder="e.g., 90" defaultValue="90" formErrors={state.formErrors} />
                <SensorInput name="P" label="Phosphorus (P)" placeholder="e.g., 42" defaultValue="42" formErrors={state.formErrors} />
                <SensorInput name="K" label="Potassium (K)" placeholder="e.g., 43" defaultValue="43" formErrors={state.formErrors} />
                <SensorInput name="pH" label="Soil pH" placeholder="e.g., 6.5" defaultValue="6.5" formErrors={state.formErrors} />
                <SensorInput name="temperature" label="Temperature (°C)" placeholder="e.g., 20.8" defaultValue="20.8" formErrors={state.formErrors} />
                <SensorInput name="humidity" label="Humidity (%)" placeholder="e.g., 82" defaultValue="82" formErrors={state.formErrors} />
                <SensorInput name="rainfall" label="Rainfall (mm)" placeholder="e.g., 202" defaultValue="202" formErrors={state.formErrors} />
                <SensorInput name="moisture" label="Moisture (%)" placeholder="e.g., 75" defaultValue="75" formErrors={state.formErrors} />
                <div className="sm:col-span-2">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>

          {state.error && !state.formErrors && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state.data && (
            <Card className="bg-green-50 dark:bg-green-900/10">
              <CardHeader>
                <CardTitle>AI Recommendation Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 text-center">
                  <p className="text-sm text-primary font-medium">Recommended Crop</p>
                  <p className="text-4xl font-bold text-primary flex items-center justify-center gap-2 mt-1">
                    <Leaf className="w-8 h-8" />
                    {state.data.recommendedCrop}
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
