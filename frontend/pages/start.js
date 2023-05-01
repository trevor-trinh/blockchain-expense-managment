import Layout from '@/components/Layout';
import {
  UserCircleIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Signup() {
  return (
    <Layout>
      <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold tracking-tight text-white text-center">
          How will you use Expense.?
        </h1>
        <div className="mt-10">
          <Cards />
        </div>
      </div>
    </Layout>
  );
}

const actions = [
  {
    title: 'Employee',
    href: '/employee',
    icon: UserCircleIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    text: 'Connect your card and make life easy through quick and efficient reimbursements',
  },
  {
    title: 'Company',
    href: '/company',
    icon: BuildingStorefrontIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    text: 'Manage and verify expenses with our one step, secure expense development',
  },
];

const Cards = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="flex flex-row justify-between">
      {actions.map((action) => (
        <div
          key={action.title}
          className={
            'rounded-lg group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-5/12'
          }>
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                'inline-flex rounded-lg p-3 ring-4 ring-white'
              )}>
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <Link href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-gray-500">{action.text}</p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
};
