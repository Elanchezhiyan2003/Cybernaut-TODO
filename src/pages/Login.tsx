// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useUserStore } from '../store/userStore';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();
//   const login = useAuthStore((state) => state.login);
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const loadUsers = useUserStore((state) => state.loadUsers);

//   useEffect(() => {
//     // Load users from localStorage when component mounts
//     loadUsers();
    
//     // Redirect if already authenticated
//     if (isAuthenticated) {
//       navigate('/admin');
//     }
//   }, [isAuthenticated, navigate, loadUsers]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!username.trim() || !password.trim()) {
//       setError('Please enter both username and password');
//       return;
//     }

//     const success = login(username, password);
    
//     if (success) {
//       navigate('/admin');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to TaskMaster Cybernaut
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm text-center">{error}</div>
//           )}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import Building from '../assets/Building.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loadUsers = useUserStore((state) => state.loadUsers);

  useEffect(() => {
    // Load users from localStorage when component mounts
    loadUsers();

    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate, loadUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);

    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end  py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${Building})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Right-side content */}
      <div className="  max-w-md w-full space-y-10 p-10 border-2 border-[#13D8FB] bg-slate-500 bg-opacity-5 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold font-poppins text-[#00A3FF] ">
            Sign in to TaskMaster
          </h2>
        </div>
        <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-10">
            <div>
              <label htmlFor="username" className="sr-only rounded-md">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border text-[#00A3FF] border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only rounded-md">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-[#00A3FF] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-center text-red-500">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00A3FF]  hover:bg-[#13D8FB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
