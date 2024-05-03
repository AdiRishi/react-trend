import { SVGProps, useState } from 'react';
import { TrendConfigurator } from '@demo/components/trend-configurator';
import { Typography } from '@demo/components/ui/typography';
import { ConfiguratorConfig, DEFAULT_CONFIG, GRADIENT_DATA, GradientKey } from '@demo/data/configurator';
import { Trend } from '@lib/index';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'React Trend' }, { name: 'description', content: 'Simple, elegant trend graphs for React.js.' }];
};

export default function Index() {
  const [config, setConfig] = useState<ConfiguratorConfig>(DEFAULT_CONFIG);

  return (
    <div>
      <section className="flex flex-col items-center justify-center space-y-10 px-5 pt-10 md:px-0">
        <div className="text-center">
          <Typography variant="h1" className="mb-10">
            React Trend
          </Typography>
          <Typography>Simple, elegant trend graphs for React.js.</Typography>
          <Typography>
            Originally project by{' '}
            <a href="https://unsplash.github.io/react-trend/" target="_blank" rel="noreferrer">
              Unsplash
            </a>
            . Rebuilt for modern React.js with ❤️
          </Typography>
        </div>
        <div className="w-full max-w-2xl">
          <TrendDraw
            gradientKey={config.gradient}
            strokeWidth={config.width}
            strokeLinecap={config.strokeLinecap}
            radius={config.radius}
          />
        </div>
        <div className="w-full max-w-2xl">
          <TrendConfigurator onConfigChange={setConfig} />
        </div>
      </section>
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
