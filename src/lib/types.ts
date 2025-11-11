export interface Farm {
  farmId: string;
  name: string;
  area_hectare: number;
  location: { lat: number; lon: number };
}

export interface SensorReading {
  readingId: string;
  farmId: string;
  timestamp: number; // Unix timestamp
  N: number;
  P: number;
  K: number;
  pH: number;
  moisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  source: 'iot' | 'manual';
}

export interface Image {
    imageId: string;
    farmId: string;
    storagePath: string;
    timestamp: number; // Unix timestamp
    imageType: 'leaf' | 'canopy';
}

export interface Recommendation {
  recId: string;
  farmId: string;
  inputFeatures: Omit<SensorReading, 'readingId' | 'farmId' | 'timestamp' | 'source'>;
  recommendedCrop: string;
  confidence: number;
  modelVersion: string;
  shap_summary: Record<string, number>;
  explanation: string;
  timestamp: number; // Unix timestamp
}

export interface DiseaseDetection {
  detId: string;
  farmId: string;
  imageId: string;
  imageUrl: string;
  predictedDisease: string;
  confidence: number;
  modelVersion: string;
  explanation: string;
  timestamp: number; // Unix timestamp
}

export interface Model {
  modelId: string;
  type: 'classifier' | 'detector' | 'regressor';
  name: string;
  version: string;
  endpointUrl: string;
  metadata: Record<string, any>;
}
