import { useEffect, useCallback, SVGProps } from 'react';
import { Button } from '@demo/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@demo/components/ui/card';
import { Slider } from '@demo/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@demo/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@demo/components/ui/toggle-group';
import { Typography } from '@demo/components/ui/typography';
import { DEFAULT_CONFIG, GRADIENT_DATA, GradientKey, STROKE_LINECAPS } from '@demo/data/configurator';
import { useSearchParams } from '@remix-run/react';
import { RefreshCcwIcon } from 'lucide-react';

export interface TrendConfiguratorProps {
  onConfigChange: (config: {
    gradient: GradientKey;
    width: number;
    radius: number;
    strokeLinecap: SVGProps<SVGPathElement>['strokeLinecap'];
  }) => void;
}

export function TrendConfigurator({ onConfigChange }: TrendConfiguratorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const gradient = searchParams.get('gradient') ?? DEFAULT_CONFIG.gradient;
  const width = Number(searchParams.get('width') ?? DEFAULT_CONFIG.width);
  const radius = Number(searchParams.get('radius') ?? DEFAULT_CONFIG.radius);
  const strokeLinecap = searchParams.get('strokeLinecap') ?? DEFAULT_CONFIG.strokeLinecap;

  const handleGradientChange = useCallback(
    (value: string) => {
      searchParams.set('gradient', value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  const handleStrokeLinecapChange = useCallback(
    (value: string) => {
      searchParams.set('strokeLinecap', value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  const handleWidthChange = useCallback(
    (value: number[]) => {
      searchParams.set('width', String(value[0]));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  const handleRadiusChange = useCallback(
    (value: number[]) => {
      searchParams.set('radius', String(value[0]));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  const handleReset = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  useEffect(() => {
    onConfigChange({
      gradient: gradient as GradientKey,
      width: Number(width),
      radius: Number(radius),
      strokeLinecap: strokeLinecap as SVGProps<SVGPathElement>['strokeLinecap'],
    });
  }, [onConfigChange, gradient, width, radius, strokeLinecap]);

  return (
    <Tabs defaultValue="configure" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="configure">Configure</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="configure">
        <Card className="relative">
          <CardContent className="p-6">
            <div className="absolute right-2 top-2">
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RefreshCcwIcon />
              </Button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Typography as="h2" variant="h5">
                  Color Picker
                </Typography>
                <ToggleGroup
                  variant="outline"
                  type="single"
                  onValueChange={handleGradientChange}
                  className="justify-start space-x-2"
                >
                  {Object.entries(GRADIENT_DATA).map(([key, value]) => (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label={`Toggle ${key}`}
                      style={{
                        background: value.length === 1 ? value[0] : `linear-gradient(0deg, ${value.join(', ')})`,
                      }}
                      asChild
                    >
                      <Button variant="outline" size="icon" className="h-7 w-7 border-2 border-white shadow-lg">
                        <span className="sr-only">{key}</span>
                      </Button>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div>
                <Typography as="h2" variant="h5">
                  Linecap
                </Typography>
                <ToggleGroup
                  variant="outline"
                  type="single"
                  onValueChange={handleStrokeLinecapChange}
                  className="justify-start"
                >
                  {STROKE_LINECAPS.map((value) => (
                    <ToggleGroupItem key={value} value={value} aria-label={`Toggle ${value}`}>
                      {value}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div>
                <Typography as="h2" variant="h5">
                  Width
                </Typography>
                <Slider
                  defaultValue={[2]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[width]}
                  onValueChange={handleWidthChange}
                />
              </div>
              <div>
                <Typography as="h2" variant="h5">
                  Radius
                </Typography>
                <Slider
                  className="bg-white"
                  defaultValue={[10]}
                  min={0}
                  max={25}
                  step={0.1}
                  value={[radius]}
                  onValueChange={handleRadiusChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="code">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
