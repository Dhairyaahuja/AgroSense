'use server';
/**
 * @fileOverview An AI agent for detecting plant diseases from uploaded images.
 *
 * - detectDiseaseFromImage - A function that handles the disease detection process.
 * - DetectDiseaseFromImageInput - The input type for the detectDiseaseFromImage function.
 * - DetectDiseaseFromImageOutput - The return type for the detectDiseaseFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectDiseaseFromImageInputSchema = z.object({
  farmId: z.string().describe('The ID of the farm the image belongs to.'),
  imageId: z.string().describe('The ID of the image being analyzed.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectDiseaseFromImageInput = z.infer<typeof DetectDiseaseFromImageInputSchema>;

const DetectDiseaseFromImageOutputSchema = z.object({
  predictedDisease: z.string().describe('The predicted disease name.'),
  confidence: z.number().describe('The confidence level of the prediction (0-1).'),
  modelVersion: z.string().describe('The version of the disease detection model used.'),
  explanation: z.string().describe('A short explanation of the prediction.'),
});
export type DetectDiseaseFromImageOutput = z.infer<typeof DetectDiseaseFromImageOutputSchema>;

export async function detectDiseaseFromImage(input: DetectDiseaseFromImageInput): Promise<DetectDiseaseFromImageOutput> {
  return detectDiseaseFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectDiseaseFromImagePrompt',
  input: {schema: DetectDiseaseFromImageInputSchema},
  output: {schema: DetectDiseaseFromImageOutputSchema},
  prompt: `You are an expert plant pathologist specializing in identifying plant diseases from leaf images.

You will analyze the provided image and determine if the plant is showing signs of disease. You will also make determination as to what disease the plant has and provide a confidence score.

Based on the image, provide the predictedDisease, confidence (0-1), modelVersion, and explanation.

Image: {{media url=photoDataUri}}
Farm ID: {{{farmId}}}
Image ID: {{{imageId}}}`,
});

const detectDiseaseFromImageFlow = ai.defineFlow(
  {
    name: 'detectDiseaseFromImageFlow',
    inputSchema: DetectDiseaseFromImageInputSchema,
    outputSchema: DetectDiseaseFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
