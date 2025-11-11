import { Header } from '@/components/layout/header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

// Mock data, will be replaced with live data later
const mockModels = [
    {
        modelId: 'model-1',
        name: 'Crop Recommendation Ensemble',
        type: 'classifier',
        version: 'catboost-v1.2',
        endpointUrl: '/api/ml/recommend-crop',
    },
    {
        modelId: 'model-2',
        name: 'Plant Disease Detection',
        type: 'detector',
        version: 'resnet50-v2.1',
        endpointUrl: '/api/ml/detect-disease',
    }
]

export default function AdminPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header title="Admin Panel" />
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">
            Model Management
          </h2>
          <p className="text-muted-foreground">
            View model versions and manage training jobs.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Deployed Models</CardTitle>
            <CardDescription>
              The following models are currently active in production.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockModels.map((model) => (
                  <TableRow key={model.modelId}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{model.type}</Badge>
                    </TableCell>
                    <TableCell>{model.version}</TableCell>
                    <TableCell className="font-mono text-xs">{model.endpointUrl}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm">
                         <RefreshCw className="mr-2 h-4 w-4" />
                         Retrain
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                    Download aggregated analytics data for registered farms.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    This action will generate and download a CSV report of key metrics across the platform.
                </p>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Analytics Report
                </Button>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
