import { config } from 'dotenv';
config();

import '@/ai/flows/explain-crop-recommendation.ts';
import '@/ai/flows/explain-disease-detection.ts';
import '@/ai/flows/disease-detection-from-image-upload.ts';
import '@/ai/flows/crop-recommendation-from-sensor-data.ts';