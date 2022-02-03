import { Outlet } from 'remix';

import { Header, Footer } from '../components';

export default function Index() {
  return (
    <div className="bg-slate-900 h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
