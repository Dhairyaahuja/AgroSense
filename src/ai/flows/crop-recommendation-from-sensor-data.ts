'use server';

/**
 * @fileOverview An AI agent that provides crop recommendations based on sensor data.
 *
 * - recommendCrop - A function that handles the crop recommendation process.
 * - RecommendCropInput - The input type for the recommendCrop function.
 * - RecommendCropOutput - The return type for the recommendCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCropInputSchema = z.object({
  farmId: z.string().describe('The ID of the farm for which to provide a crop recommendation.'),
  features: z.object({
    N: z.number().describe('Nitrogen level in the soil.'),
    P: z.number().describe('Phosphorus level in the soil.'),
    K: z.number().describe('Potassium level in the soil.'),
    pH: z.number().describe('pH level of the soil.'),
    moisture: z.number().describe('Moisture content of the soil.'),
    temperature: z.number().describe('Temperature of the soil in Celsius.'),
    humidity: z.number().describe('Humidity of the air.'),
    rainfall: z.number().describe('Rainfall in mm.'),
  }).describe('The sensor data features for the farm.'),
});
export type RecommendCropInput = z.infer<typeof RecommendCropInputSchema>;

const RecommendCropOutputSchema = z.object({
  recommendedCrop: z.string().describe('The recommended crop to plant.'),
  confidence: z.number().describe('The confidence level of the recommendation (0-1).'),
  modelVersion: z.string().describe('The version of the model used for the recommendation.'),
  shap_summary: z.record(z.number()).describe('SHAP values for feature importance.'),
  explanation: z.string().describe('A short explanation of why the crop was recommended based on SHAP values.'),
});
export type RecommendCropOutput = z.infer<typeof RecommendCropOutputSchema>;

export async function recommendCrop(input: RecommendCropInput): Promise<RecommendCropOutput> {
  return recommendCropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCropPrompt',
  input: {schema: RecommendCropInputSchema},
  output: {schema: RecommendCropOutputSchema},
  prompt: `You are an expert agricultural advisor providing crop recommendations based on sensor data.

  Given the following sensor data from farm ID {{{farmId}}}, recommend the most suitable crop to plant.
  Explain your reasoning based on the impact of each sensor reading.

  Sensor Data:
  Nitrogen (N): {{{features.N}}}
  Phosphorus (P): {{{features.P}}}
  Potassium (K): {{{features.K}}}
  pH: {{{features.pH}}}
  Moisture: {{{features.moisture}}}
  Temperature: {{{features.temperature}}}
  Humidity: {{{features.humidity}}}
  Rainfall: {{{features.rainfall}}}
  
  Return the recommended crop, confidence level, model version, SHAP summary, and a concise explanation.
  `,
});

const recommendCropFlow = ai.defineFlow(
  {
    name: 'recommendCropFlow',
    inputSchema: RecommendCropInputSchema,
    outputSchema: RecommendCropOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
