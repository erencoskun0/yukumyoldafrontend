"use client";
import React from "react";
import { Truck, Loader2, Sparkles } from "lucide-react";

const ModernLoading = () => {
  return (
    <div className="h-[100vh] fixed top-0 left-0 w-full backdrop-blur-sm flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main Loading Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 max-w-md mx-auto">
          {/* Truck Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <Truck className="w-12 h-12 text-white animate-bounce" />
            </div>

            {/* Moving dots */}
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Araç Bilgileri Yükleniyor
            </h2>
            <p className="text-gray-600 mb-6">
              Lütfen bekleyiniz, verileriniz hazırlanıyor...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Spinning Loader */}
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
            <span className="text-gray-700 font-medium">Yükleniyor...</span>
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-gray-500 text-sm">
          <p className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Sistem aktif</span>
          </p>
        </div>
      </div>

      {/* Custom CSS for loading animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `,
        }}
      />
    </div>
  );
};

// Alternative Minimal Loading
const MinimalLoading = () => {
  return (
    <div className="h-[100vh] fixed top-0 left-0 w-full backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Spinning Ring */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>

          {/* Inner Pulse */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full animate-pulse opacity-20"></div>
        </div>

        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Skeleton Loading
const SkeletonLoading = () => {
  return (
    <div className="h-[100vh] fixed top-0 left-0 w-full backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            ))}

            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingComponent = ({ type = "modern" }) => {
  switch (type) {
    case "minimal":
      return <MinimalLoading />;
    case "skeleton":
      return <SkeletonLoading />;
    default:
      return <ModernLoading />;
  }
};

export default LoadingComponent;
