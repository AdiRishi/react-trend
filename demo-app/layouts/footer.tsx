import { cn } from '@demo/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return <footer className={cn(className)}></footer>;
}
