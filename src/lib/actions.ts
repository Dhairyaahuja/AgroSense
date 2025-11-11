'use server';

import { z } from 'zod';
import { recommendCrop } from '@/ai/flows/crop-recommendation-from-sensor-data';
import { detectDiseaseFromImage } from '@/ai/flows/disease-detection-from-image-upload';

const recommendationSchema = z.object({
  farmId: z.string().min(1, 'Farm ID is required'),
  N: z.coerce.number().min(0, "Nitrogen can't be negative").max(200, 'Nitrogen value is too high'),
  P: z.coerce.number().min(0, "Phosphorus can't be negative").max(200, 'Phosphorus value is too high'),
  K: z.coerce.number().min(0, "Potassium can't be negative").max(300, 'Potassium value is too high'),
  pH: z.coerce.number().min(0, "pH must be between 0-14").max(14, 'pH must be between 0-14'),
  moisture: z.coerce.number().min(0, "Moisture can't be negative").max(100, 'Moisture must be a percentage'),
  temperature: z.coerce.number().min(-50, 'Temperature is too low').max(60, 'Temperature is too high'),
  humidity: z.coerce.number().min(0, "Humidity can't be negative").max(100, 'Humidity must be a percentage'),
  rainfall: z.coerce.number().min(0, "Rainfall can't be negative").max(5000, 'Rainfall value seems too high'),
});

type RecommendationState = {
  data?: Awaited<ReturnType<typeof recommendCrop>>;
  error?: string;
  formErrors?: z.ZodError['formErrors'];
};

export async function getCropRecommendation(prevState: RecommendationState, formData: FormData): Promise<RecommendationState> {
  const validatedFields = recommendationSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.data) {
    return {
      error: 'Invalid input provided.',
      formErrors: validatedFields.error.flatten(),
    };
  }

  try {
    const result = await recommendCrop({
      farmId: validatedFields.data.farmId,
      features: validatedFields.data,
    });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get recommendation from AI. Please try again.' };
  }
}


const diseaseDetectionSchema = z.object({
  photoDataUri: z.string().min(1, 'Image is required.'),
});

type DiseaseDetectionState = {
    data?: Awaited<ReturnType<typeof detectDiseaseFromImage>>;
    error?: string;
}

export async function getDiseaseDetection(prevState: DiseaseDetectionState, formData: FormData): Promise<DiseaseDetectionState> {
    const validatedFields = diseaseDetectionSchema.safeParse(Object.fromEntries(formData.entries()));
    
    if(!validatedFields.data) {
        return { error: "No image provided for analysis." };
    }

    try {
        const result = await detectDiseaseFromImage({
            farmId: 'farm-1', // Mock farmId
            imageId: `img_${Date.now()}`,
            photoDataUri: validatedFields.data.photoDataUri,
        });
        return { data: result };
    } catch(e) {
        console.error(e);
        return { error: "Failed to analyze image with AI. Please try again." };
    }
}
