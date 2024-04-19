import { Trend } from '@lib/index';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix SPA' }, { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }];
};

export default function Index() {
  const placeholderData = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];
  const gradient = ['#00c6ff', '#F0F', '#FF0'];
  const radius = 10;
  const strokeWidth = 2;
  const strokeLinecap = 'butt';

  return (
    <div>
      <h1>Trend Element</h1>
      <div>
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
      </div>
    </div>
  );
}
