'use server';

/**
 * @fileOverview Explains the reasoning behind crop recommendations using SHAP values.
 *
 * - explainCropRecommendation - A function that takes recommendation input features and returns a human-readable explanation.
 * - ExplainCropRecommendationInput - The input type for the explainCropRecommendation function.
 * - ExplainCropRecommendationOutput - The return type for the explainCropRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCropRecommendationInputSchema = z.object({
  farmId: z.string().describe('The ID of the farm for which the recommendation is made.'),
  inputFeatures: z
    .record(z.number())
    .describe('The input features used for the crop recommendation (N, P, K, pH, moisture, temperature, humidity, rainfall).'),
  recommendedCrop: z.string().describe('The crop that was recommended.'),
  confidence: z.number().describe('The confidence score of the recommendation.'),
  modelVersion: z.string().describe('The version of the model used to generate the recommendation.'),
  shap_summary: z
    .record(z.number())
    .describe('A map of feature names to their SHAP values, for global feature importance.'),
});
export type ExplainCropRecommendationInput = z.infer<typeof ExplainCropRecommendationInputSchema>;

const ExplainCropRecommendationOutputSchema = z.object({
  explanation: z.string().describe('A human-readable explanation of the crop recommendation.'),
});
export type ExplainCropRecommendationOutput = z.infer<typeof ExplainCropRecommendationOutputSchema>;

export async function explainCropRecommendation(input: ExplainCropRecommendationInput): Promise<ExplainCropRecommendationOutput> {
  return explainCropRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCropRecommendationPrompt',
  input: {schema: ExplainCropRecommendationInputSchema},
  output: {schema: ExplainCropRecommendationOutputSchema},
  prompt: `You are an AI assistant that explains crop recommendations to farmers.  You will receive data representing the features of a farm, the recommended crop, and SHAP values indicating the importance of each feature in the decision.

  Your task is to generate a concise, human-readable explanation of why the crop was recommended, focusing on the most influential features as indicated by the SHAP values.

  Farm ID: {{{farmId}}}
  Recommended Crop: {{{recommendedCrop}}}
  Confidence: {{{confidence}}}
  Model Version: {{{modelVersion}}}
  Input Features: {{JSON.stringify inputFeatures}}
  SHAP Values: {{JSON.stringify shap_summary}}

  Explanation: Based on the provided information, the recommended crop is {{{recommendedCrop}}}.  The most influential factors are (explain the top 2-3 SHAP values and how they contribute to the recommendation). Be concise and use language a farmer can understand. For example, say "Lentils are recommended due to low Nitrogen and moderate rainfall (Lentils fix nitrogen).". Do not reference SHAP or the fact you are an AI. Just present facts.
`,
});

const explainCropRecommendationFlow = ai.defineFlow(
  {
    name: 'explainCropRecommendationFlow',
    inputSchema: ExplainCropRecommendationInputSchema,
    outputSchema: ExplainCropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
