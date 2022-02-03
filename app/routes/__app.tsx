import { Outlet } from 'remix';

import { Header, Footer } from '../components';

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
