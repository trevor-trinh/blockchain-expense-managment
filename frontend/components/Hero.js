import IdCard from './IdCard';
import Link from 'next/link';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <div className="bg-gray-900 min-h-screen min-w-screen">
      <Navbar />
      <div className="relative isolate overflow-hidden bg-gray-900 mx-auto">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true">
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
          />
        </svg>
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true">
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 justify-between">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              No Expenses. <br />
              No Worries.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Take control of your finances and simplify your life with our
              cutting-edge expense management website, Simpli Spend.
            </p>
            <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold text-white">Secure</h2>
                <p className="mt-2 text-md text-gray-300">
                  Enter your details and 'send' for a short and effortless
                  transaction
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Fast</h2>
                <p className="mt-2 text-md text-gray-300">
                  Connect your wallet to secure all your data in one place
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/start"
                className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                Get Started
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none relative">
              <IdCard src="images/TrevorCard.png" />
              <div className="absolute inset-1/4 w-full h-full object-cover rounded-lg rotate-[20deg] z-40">
                <IdCard src="images/DerrickCard.png" />
              </div>
              <div className="absolute inset-2/4 w-full h-full object-cover rounded-lg rotate-[35deg] z-30">
                <IdCard src="images/BrianCard.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
