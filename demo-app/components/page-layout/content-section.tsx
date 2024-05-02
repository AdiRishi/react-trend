import { cn } from '@demo/lib/utils';

export function ContentSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn('px-4 py-12 lg:px-8 lg:py-16 xl:px-32 xl:py-28', className)}>{children}</section>;
}
