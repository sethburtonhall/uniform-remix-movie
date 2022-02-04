import { Outlet } from 'remix';

import { Header, Footer } from '../components';

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
