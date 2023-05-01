import Navbar from '../components/Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="h-screen relative isolate overflow-hidden bg-gray-900 mx-auto">
        <div className="ml-8 mx-auto max-w-7xl px-6 pb-24 pt-14 sm:pb-32">
          {children}
        </div>
      </div>
    </div>
  );
}