"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiTestPage() {
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setTestResult("Testing API connection...");
    
    try {
      // Test simple endpoint first
      const testResponse = await fetch('http://127.0.0.1:8000/api/test');
      const testData = await testResponse.json();
      
      if (testResponse.ok) {
        setTestResult(`✅ Basic API Test Successful!\n\nTest Response: ${JSON.stringify(testData, null, 2)}\n\nNow testing business permits endpoint...`);
        
        // Now test business permits endpoint
        const response = await fetch('http://127.0.0.1:8000/api/business-permits');
        const data = await response.json();
        
        if (response.ok) {
          setTestResult(prev => prev + `\n\n✅ Business Permits API Successful!\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        } else {
          setTestResult(prev => prev + `\n\n❌ Business Permits API Error: ${response.status} - ${response.statusText}\n\nResponse: ${JSON.stringify(data, null, 2)}`);
        }
      } else {
        setTestResult(`❌ Basic API Test Failed: ${testResponse.status} - ${testResponse.statusText}\n\nResponse: ${JSON.stringify(testData, null, 2)}`);
      }
    } catch (error) {
      setTestResult(`❌ Connection Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testCors = async () => {
    setLoading(true);
    setTestResult("Testing CORS...");
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/business-permits', {
        method: 'OPTIONS',
        headers: {
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });
      
      if (response.ok) {
        setTestResult(`✅ CORS Preflight Successful!\n\nHeaders: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`);
      } else {
        setTestResult(`❌ CORS Preflight Failed: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ CORS Test Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">API Connection Test</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test API Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testApiConnection} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Test GET /api/business-permits"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test CORS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testCors} 
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? "Testing..." : "Test CORS Preflight"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle>Test Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
              {testResult}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Backend Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Backend URL:</strong> http://127.0.0.1:8000</p>
            <p><strong>API Base URL:</strong> http://127.0.0.1:8000/api</p>
            <p><strong>Frontend URL:</strong> http://localhost:3000</p>
            <p><strong>CORS Origins:</strong> http://localhost:3000, http://127.0.0.1:3000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
