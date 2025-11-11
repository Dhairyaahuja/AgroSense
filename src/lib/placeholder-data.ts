import type { Farm, Recommendation, DiseaseDetection, Model } from './types';

export const mockFarms: Farm[] = [
  {
    farmId: 'farm-1',
    name: 'Green Valley Acres',
    area_hectare: 50,
    location: { lat: 34.0522, lon: -118.2437 },
  },
  {
    farmId: 'farm-2',
    name: 'Sunny Meadow Farm',
    area_hectare: 25,
    location: { lat: 36.7783, lon: -119.4179 },
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    recId: 'rec-1',
    farmId: 'farm-1',
    inputFeatures: { N: 18, P: 12.5, K: 150, pH: 6.2, moisture: 22.5, temperature: 28.5, humidity: 65, rainfall: 750 },
    recommendedCrop: 'Lentils',
    confidence: 0.92,
    modelVersion: 'catboost-v1.2',
    shap_summary: { N: -0.25, rainfall: 0.45, pH: 0.1, K: 0.15 },
    explanation: 'Lentils recommended due to low Nitrogen and moderate rainfall (Lentils fix nitrogen).',
    timestamp: new Date('2023-10-26T10:00:00Z').getTime(),
  },
  {
    recId: 'rec-2',
    farmId: 'farm-2',
    inputFeatures: { N: 90, P: 45, K: 45, pH: 6.5, moisture: 65, temperature: 25, humidity: 80, rainfall: 2000 },
    recommendedCrop: 'Rice',
    confidence: 0.98,
    modelVersion: 'catboost-v1.2',
    shap_summary: { rainfall: 0.6, N: 0.2, humidity: 0.1, P: 0.05 },
    explanation: 'Rice recommended due to high rainfall, high nitrogen, and optimal humidity.',
    timestamp: new Date('2023-10-25T14:30:00Z').getTime(),
  },
];

export const mockDetections: DiseaseDetection[] = [
  {
    detId: 'det-1',
    farmId: 'farm-1',
    imageId: 'img-1',
    imageUrl: 'https://picsum.photos/seed/leaf2/600/400',
    predictedDisease: 'Apple Scab',
    confidence: 0.88,
    modelVersion: 'resnet50-v2.1',
    explanation: 'Detected characteristic dark, scabby spots on the leaf surface, consistent with Apple Scab fungus.',
    timestamp: new Date('2023-10-27T09:00:00Z').getTime(),
  },
    {
    detId: 'det-2',
    farmId: 'farm-1',
    imageId: 'img-2',
    imageUrl: 'https://picsum.photos/seed/leaf3/600/400',
    predictedDisease: 'Tomato Late Blight',
    confidence: 0.95,
    modelVersion: 'resnet50-v2.1',
    explanation: 'The image shows large, dark lesions with a greasy appearance, typical of late blight infection in tomatoes.',
    timestamp: new Date('2023-10-28T11:20:00Z').getTime(),
  }
];

export const mockModels: Model[] = [
  {
    modelId: 'model-1',
    type: 'classifier',
    name: 'Crop Recommendation Ensemble',
    version: 'catboost-v1.2',
    endpointUrl: '/api/ml/recommend-crop',
    metadata: {
      features: ['N', 'P', 'K', 'pH', 'moisture', 'temperature', 'humidity', 'rainfall'],
      global_shap: { rainfall: 0.55, N: 0.2, K: 0.1, P: 0.08, pH: 0.04, temperature: 0.02, humidity: 0.01 },
    },
  },
  {
    modelId: 'model-2',
    type: 'detector',
    name: 'Plant Disease Detection',
    version: 'resnet50-v2.1',
    endpointUrl: '/api/ml/detect-disease',
    metadata: {
      base_model: 'ResNet-50',
      classes: ['Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Healthy', '...'],
    },
  },
];
