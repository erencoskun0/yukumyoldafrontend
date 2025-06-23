import { AppDispatch, RootState } from "@/redux/store/store";
import { Truck, User, ChevronDown, LogOut, UserCircle } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { log } from "console";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

type propsType = {
  title: string;
  desc?: string;
};

const Header = ({ title, desc }: propsType) => {
  const { name, surName, isAuthenticated } = useSelector(
    (state: RootState) => state.authUser
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logout());
    navigate.push("/");
  };

  return (
    <div className="bg-white border-b border-blue-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-3">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-gray-600">{desc}</p>
            </div>
          </div>

          {isAuthenticated ? (
            <div className=" relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center bg-gradient-to-r from-green-100 to-green-50 text-green-800 sm:px-6 py-3 px-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 border border-green-200">
                <div className="bg-green-600 rounded-full p-1 sm:mr-3 mr-1">
                  <User size={16} className="text-white" />
                </div>
                <span className="mr-2 hidden sm:inline-block">
                  {name} {surName}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {name} {surName}
                    </p>
                    <p className="text-xs text-gray-500">Hesap Seçenekleri</p>
                  </div>

                  <Link href="/profil" className="w-full">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-300">
                      <UserCircle size={18} className="mr-3" />
                      Profil
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-300">
                    <LogOut size={18} className="mr-3" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-3">
              <Link href="/giris-yap">
                <button className="inline-flex items-center bg-white text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <User size={18} className="mr-2" />
                  Giriş Yap
                </button>
              </Link>

              <Link href="/kayit-ol">
                <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <User size={18} className="mr-2" />
                  Kayıt Ol
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
