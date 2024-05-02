import { useEffect, useCallback, SVGProps } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@demo/components/ui/card';
import { Slider } from '@demo/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@demo/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@demo/components/ui/toggle-group';
import { Typography } from '@demo/components/ui/typography';
import { GRADIENT_DATA, GradientKey, STROKE_LINECAPS } from '@demo/data/configurator';
import { useSearchParams } from '@remix-run/react';

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
  const gradient = searchParams.get('gradient') ?? 'rainbow';
  const width = searchParams.get('width') ?? '2';
  const radius = searchParams.get('radius') ?? '10';
  const strokeLinecap = searchParams.get('strokeLinecap') ?? 'butt';

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
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2">
              <div>
                <div>
                  <Typography variant="h3">Color Picker</Typography>
                  <ToggleGroup variant="outline" type="single" onValueChange={handleGradientChange}>
                    {Object.entries(GRADIENT_DATA).map(([key, value]) => (
                      <ToggleGroupItem
                        key={key}
                        value={key}
                        aria-label={`Toggle ${key}`}
                        style={{
                          background: value.length === 1 ? value[0] : `linear-gradient(0deg, ${value.join(', ')})`,
                        }}
                      />
                    ))}
                  </ToggleGroup>
                </div>
                <div>
                  <Typography variant="h3">Linecap</Typography>
                  <ToggleGroup variant="outline" type="single" onValueChange={handleStrokeLinecapChange}>
                    {STROKE_LINECAPS.map((value) => (
                      <ToggleGroupItem key={value} value={value} aria-label={`Toggle ${value}`}>
                        {value}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <div>
                <Typography variant="h3">Width</Typography>
                <Slider defaultValue={[2]} min={0.1} max={5} step={0.1} onValueChange={handleWidthChange} />
                <Typography variant="h3">Radius</Typography>
                <Slider defaultValue={[10]} min={0} max={25} step={0.1} onValueChange={handleRadiusChange} />
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
