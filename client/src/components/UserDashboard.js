import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import header from "../assets/header.png";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.accountDetails;
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const chngSubClick = (e) => {
    e.preventDefault();
    navigate("/subtiers");
  };
  const accDetClick = (e) => {
    e.preventDefault();
    navigate("/profiledetails");
  };
  const signOutClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const storedAccountID = localStorage.getItem("accountID");

  const { data: accountDetails, error } = useSWR(
    storedAccountID
      ? `https://techhive-app-96b92969b3d5.herokuapp.com/api/retrieve-account?accountID=${storedAccountID}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (!storedAccountID) {
      console.error("Account ID not found in local storage");
    }
  }, [storedAccountID]);

  const renderProfileDetails = (profile) => {
    if (!profile) return null;
    const { name, email, birthDateProvided, governmentIDProvided } =
      profile.individual;

    return `${name.firstNam} ${name.lastName}`;
  };

  return (
    <div
      className="min-h-screen py-12 bg-gray-900 bg-cover"
      style={{ backgroundImage: `url(${header})` }}
    >
      {/* <!-- component --> */}
      {accountDetails && (
        <div className="flex-grow bg-gray-50/50">
          <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <div className="relative border-b border-white/20">
              <a className="flex items-center gap-4 px-8 py-6" href="#/">
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-white">
                  TechHive
                </h6>
              </a>
              <button
                className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="m-4">
              <ul className="flex flex-col gap-1 mb-4">
                <li>
                  <a aria-current="page" className="active" href="#">
                    <button
                      className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-inherit"
                      >
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                      </svg>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed capitalize text-inherit">
                        dashboard
                      </p>
                    </button>
                  </a>
                </li>
                <li>
                  <a className="" href="#">
                    <button
                      className="flex items-center w-full gap-4 px-4 py-3 font-sans text-xs font-bold text-white capitalize transition-all rounded-lg middle none center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-white/10 active:bg-white/30"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-inherit"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed capitalize text-inherit">
                        {accountDetails.displayName}
                      </p>
                    </button>
                  </a>
                </li>
                <li>
                  <a className="" href="#">
                    <button
                      className="flex items-center w-full gap-4 px-4 py-3 font-sans text-xs font-bold text-white capitalize transition-all rounded-lg middle none center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-white/10 active:bg-white/30"
                      type="button"
                      onClick={accDetClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-inherit"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed capitalize text-inherit">
                        account details
                      </p>
                    </button>
                  </a>
                </li>
                <li>
                  <a className="" href="#">
                    <button
                      className="flex items-center w-full gap-4 px-4 py-3 font-sans text-xs font-bold text-white capitalize transition-all rounded-lg middle none center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-white/10 active:bg-white/30"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-inherit"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed capitalize text-inherit">
                        notifactions
                      </p>
                    </button>
                  </a>
                </li>
                <li>
                  <a className="" href="#">
                    <button
                      className="flex items-center w-full gap-4 px-4 py-3 font-sans text-xs font-bold text-white capitalize transition-all rounded-lg middle none center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-white/10 active:bg-white/30"
                      type="button"
                      onClick={signOutClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-inherit"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed capitalize text-inherit">
                        sign out
                      </p>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="flex flex-col min-h-screen p-4 xl:ml-80">
            <nav className="block w-full max-w-full px-0 py-1 text-white transition-all bg-transparent shadow-none rounded-xl">
              <div className="flex justify-end">
                <div className="flex items-center">
                  {/* <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="3" className="w-6 h-6 text-blue-gray-500">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
                    </svg>
                    </span>
                </button> */}
                  <a href="#">
                    <button
                      className="items-center hidden gap-1 px-4 py-3 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg middle none center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none xl:flex"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-white text-blue-gray-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {accountDetails.displayName}
                    </button>
                    <button
                      className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white grid xl:hidden"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-5 h-5 text-white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </a>
                  <button
                    className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-blue-gray-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </nav>
            <div className="flex-grow mt-12">
              <div className="grid mb-12 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                  <div className="absolute grid w-16 h-16 mx-4 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">
                      Amount Due
                    </p>
                    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      $0.00
                    </h4>
                  </div>
                  <div className="p-4 border-t border-blue-gray-50">
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                      &nbsp;You’re all set! Your Auto Pay is scheduled for July
                      12
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                  <div className="absolute grid w-16 h-16 mx-4 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gradient-to-tr from-red-600 to-red-400 shadow-red-500/40 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">
                      Subscription Tier 1
                    </p>
                    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      $49.99
                    </h4>
                  </div>
                  <div className="p-4 border-t border-blue-gray-50">
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                      <button
                        type="button"
                        className="font-bold text-green-600"
                        onClick={chngSubClick}
                      >
                        Change Subscription
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-4 xl:grid-cols-3">
                <div className="relative flex flex-col overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl xl:col-span-2">
                  <div className="relative flex items-center justify-between p-6 m-0 overflow-hidden text-gray-700 bg-transparent shadow-none bg-clip-border rounded-xl">
                    <div>
                      <h6 className="block mb-1 font-sans text-base antialiased font-bold leading-relaxed tracking-normal font-large text-blue-gray-900">
                        PAYMENTS
                      </h6>
                    </div>
                  </div>
                  <div className="p-6 px-0 pt-0 pb-2 overflow-x-scroll">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-[11px] font-medium text-blue-gray-400">
                              Payment Date
                            </p>
                          </th>
                          <th className="px-6 py-3 text-left border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-[11px] font-medium text-blue-gray-400">
                              Amount
                            </p>
                          </th>
                          <th className="px-6 py-3 text-left border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-[11px] font-medium text-blue-gray-400">
                              Status
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                                06/12/24
                              </p>
                            </div>
                          </td>

                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              -$49.99
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              pending
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                                05/12/24
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              -$49.99
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              successful
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                                04/12/24
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              -$99.98
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              successful
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                                03/12/24
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              -$49.99
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium font-bold text-blue-gray-600">
                              past due
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                                02/12/24
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              -$49.99
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-blue-gray-50">
                            <p className="block font-sans text-xs antialiased font-medium text-blue-gray-600">
                              successful
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-blue-gray-600">
              <footer className="py-2">
                <div className="flex flex-wrap items-center justify-center w-full gap-6 px-2 md:justify-between">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-white text-inherit">
                    © 2024 TechHive{" "}
                  </p>
                  <ul className="flex items-center gap-4">
                    <li>
                      <a
                        href="https://www.creative-tim.com/presentation"
                        target="_blank"
                        className="text-white block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.creative-tim.com/blog"
                        target="_blank"
                        className="text-white block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.creative-tim.com/license"
                        target="_blank"
                        className="text-white block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                      >
                        License
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
