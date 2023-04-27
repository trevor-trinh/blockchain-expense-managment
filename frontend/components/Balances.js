export default function Balances({ stats }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">
                  Balances
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  Your current balances
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3 shadow-2xl ring-1 ring-white/10 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                  <p className="text-sm font-medium leading-6 text-gray-400">
                    {stat.name}
                  </p>
                  <p className="mt-2 flex items-baseline gap-x-2">
                    <span className="text-4xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </span>
                    {stat.unit ? (
                      <span className="text-sm text-gray-400">{stat.unit}</span>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
