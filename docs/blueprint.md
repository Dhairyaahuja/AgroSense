# **App Name**: AgroAssist

## Core Features:

- User Authentication: Secure authentication with email/password and optional phone OTP.
- Role-Based Access Control: Differentiate user access based on roles (farmer, extension_agent, admin).
- Farm Management: Add, manage, and track farm details including location, size, and soil reports.
- Sensor Data Input: Input sensor readings (N, P, K, pH, moisture, temp, etc.) manually or via IoT devices.
- AI-Powered Crop Recommendation: Get AI-driven crop recommendations based on sensor data and historical yield features, served via a tool in Cloud Run.
- AI-Powered Disease Detection: Upload leaf images for disease detection using a ResNet-50 model served via a tool in Cloud Run.
- Explainable AI (XAI): Provide SHAP-based explanations for crop recommendations and disease detections.

## Style Guidelines:

- Primary color: Earthy green (#74A363) evoking nature and growth.
- Background color: Light beige (#F5F5DC), a desaturated tint of earthy green for a natural, soothing backdrop.
- Accent color: Warm gold (#D4AF37), analogous to green, for highlights and important actions.
- Body and headline font: 'PT Sans', a modern sans-serif with a touch of warmth and approachability.
- Use clean, line-based icons representing farm elements, sensor data, and AI insights.
- A clear, card-based layout optimized for dashboards and data presentation.
- Subtle animations for data loading and AI insights.