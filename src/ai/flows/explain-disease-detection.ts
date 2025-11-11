'use server';

/**
 * @fileOverview An AI agent to explain disease detections in plant images.
 *
 * - explainDiseaseDetection - A function that takes an image and disease detection data and returns an explanation.
 * - ExplainDiseaseDetectionInput - The input type for the explainDiseaseDetection function.
 * - ExplainDiseaseDetectionOutput - The return type for the explainDiseaseDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainDiseaseDetectionInputSchema = z.object({
  imageId: z.string().describe('The ID of the image.'),
  farmId: z.string().describe('The ID of the farm the image belongs to.'),
  predictedDisease: z.string().describe('The predicted disease.'),
  confidence: z.number().describe('The confidence level of the prediction.'),
  explanation: z.string().optional().describe('Optional existing explanation.'),
  imageStoragePath: z.string().describe('Path to the image in Firebase Storage.'),
});
export type ExplainDiseaseDetectionInput = z.infer<typeof ExplainDiseaseDetectionInputSchema>;

const ExplainDiseaseDetectionOutputSchema = z.object({
  explanation: z.string().describe('A human-readable explanation of the disease detection.'),
});
export type ExplainDiseaseDetectionOutput = z.infer<typeof ExplainDiseaseDetectionOutputSchema>;

export async function explainDiseaseDetection(input: ExplainDiseaseDetectionInput): Promise<ExplainDiseaseDetectionOutput> {
  return explainDiseaseDetectionFlow(input);
}

const explainDiseaseDetectionPrompt = ai.definePrompt({
  name: 'explainDiseaseDetectionPrompt',
  input: {schema: ExplainDiseaseDetectionInputSchema},
  output: {schema: ExplainDiseaseDetectionOutputSchema},
  prompt: `You are an AI expert specializing in explaining plant disease detections to farmers.

  Given the following information about a disease detection, provide a clear and concise explanation of why the AI made this prediction. Consider the predicted disease, the confidence level, and any existing explanation.  Focus on translating technical details into easily understandable terms for farmers. You can also use the imageStoragePath to generate the image into the prompt.

  Image: {{media url=imageStoragePath}}
  Farm ID: {{{farmId}}}
  Predicted Disease: {{{predictedDisease}}}
  Confidence: {{{confidence}}}
  Existing Explanation: {{{explanation}}}

  Explanation:`,}
);

const explainDiseaseDetectionFlow = ai.defineFlow(
  {
    name: 'explainDiseaseDetectionFlow',
    inputSchema: ExplainDiseaseDetectionInputSchema,
    outputSchema: ExplainDiseaseDetectionOutputSchema,
  },
  async input => {
    const {output} = await explainDiseaseDetectionPrompt(input);
    return {
      explanation: output!.explanation,
    };
  }
);
