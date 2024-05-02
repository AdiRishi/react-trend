import { Footer } from './footer';
import { Header } from './header';

export type LayoutProps = {
  children: React.ReactNode;
};
export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
