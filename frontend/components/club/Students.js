import { useEffect, useState } from 'react';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students');
      const data = await response.json();

      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="py-6 px-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-white">
            Students
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            A list of all the students and their associated wallet address.
          </p>
        </div>
      </div>
      {students === undefined || students.length === 0 ? (
        <div className="flex justify-center pt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-spacing-3 border-b-2 border-indigo-400"></div>
        </div>
      ) : (
        <div className="mt-6 px-6 pt-4 pb-6 bg-gray-900 shadow-2xl ring-1 ring-white/10">
          <div className="text-center">
            <h3 className="text-base font-semibold text-white">
              🏫 Students 🏫
            </h3>
          </div>
          <div className="mt-4 flow-root rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 px-5 sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
              <div className="inline-block min-w-full py-2 align-middle ">
                <div className="overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <tbody className="divide-y divide-gray-700">
                      {students.map((student) => {
                        return (
                          <tr key={student._id}>
                            <td className="relative py-5 pr-6 pl-4">
                              <div className="flex gap-x-6">
                                <div className="flex-auto">
                                  <div className="flex items-start gap-x-3">
                                    <div className="text-sm font-medium leading-6 text-gray-300">
                                      {student.name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-5 pr-4 text-right">
                              <div className="flex justify-end">
                                <a
                                  href={`https://mumbai.polygonscan.com/address/${student.address}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-medium leading-6 text-indigo-500 hover:text-indigo-400 hover:cursor-pointer">
                                  {student.address}
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
