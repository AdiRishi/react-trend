import { cn } from '@demo/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return <header className={cn(className)}></header>;
}
