import { SVGProps, useState } from 'react';
import { ContentSection } from '@demo/components/page-layout/content-section';
import { TrendConfigurator } from '@demo/components/trend-configurator';
import { Typography } from '@demo/components/ui/typography';
import { GRADIENT_DATA, GradientKey } from '@demo/data/configurator';
import { Trend } from '@lib/index';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'React Trend' }, { name: 'description', content: 'Simple, elegant trend graphs for React.js.' }];
};

export default function Index() {
  const [config, setConfig] = useState({
    gradient: 'rainbow' as GradientKey,
    width: 2,
    radius: 10,
    strokeLinecap: 'butt' as SVGProps<SVGPathElement>['strokeLinecap'],
  });

  return (
    <div>
      <ContentSection className="flex flex-col items-center justify-center">
        <Typography variant="h1">React Trend</Typography>
        <Typography>Simple, elegant trend graphs for React.js.</Typography>
        <div className="w-full">
          <TrendDraw
            gradientKey={config.gradient}
            strokeWidth={config.width}
            strokeLinecap={config.strokeLinecap}
            radius={config.radius}
          />
        </div>
        <TrendConfigurator onConfigChange={setConfig} />
      </ContentSection>
    </div>
  );
}

function TrendDraw({
  gradientKey,
  strokeWidth,
  radius,
  strokeLinecap,
}: {
  gradientKey: GradientKey;
  strokeWidth: number;
  radius: number;
  strokeLinecap: SVGProps<SVGPathElement>['strokeLinecap'];
}) {
  const placeholderData = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];
  const gradient = GRADIENT_DATA[gradientKey];
  return (
    <Trend
      autoDraw
      autoDrawDuration={3000}
      autoDrawEasing="ease-out"
      smooth
      data={placeholderData}
      gradient={gradient}
      radius={radius}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
    />
  );
}
