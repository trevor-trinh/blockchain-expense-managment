import Navbar from '../components/Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <div className="min-h-screen min-w-screen relative isolate bg-gray-900 mx-auto">
        <Navbar />
        <div className="mx-auto max-w-7xl pt-20">{children}</div>
      </div>
    </div>
  );
}
