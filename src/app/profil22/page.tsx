"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  Truck,
  MapPin,
  Edit,
  CheckCircle,
  Loader as LoaderIcon,
  Package,
  Plus,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
 
const provinces = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Konya",
  "Trabzon",
  "Gaziantep",
  "Adana",
  "Samsun",
  "Şanlıurfa",
];

// --- Araç Sahibi için Profil Kartı ---
function VehicleOwnerProfile() {
  // Mock veri, gerçek uygulamada API'den veya redux'tan alınmalı
  const [vehicle, setVehicle] = useState({
    plate: "34 ABC 1234",
    description:
      "Uzun yol deneyimli, bakımlı kamyon. Soğuk zincir taşımacılığına uygun.",
    province: "İstanbul",
    ready: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(vehicle);
  const [error, setError] = useState("");

  // Form input değişikliği
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Güncelleme işlemi (mock)
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Basit validasyon
    if (!form.plate || !form.description || !form.province) {
      setError("Tüm alanlar zorunludur.");
      return;
    }
    setVehicle(form);
    setEditMode(false);
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 mr-4">
          <Truck className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Araç Sahibi Profili
        </h2>
      </div>
      {!editMode ? (
        <>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Plaka:</span>
            <span className="ml-2 text-gray-900">{vehicle.plate}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Açıklama:</span>
            <span className="ml-2 text-gray-900">{vehicle.description}</span>
          </div>
          <div className="mb-4 flex items-center">
            <MapPin className="h-5 w-5 text-blue-600 mr-1" />
            <span className="font-semibold text-gray-700">Mevcut İl:</span>
            <span className="ml-2 text-gray-900">{vehicle.province}</span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="font-semibold text-gray-700 mr-2">Durum:</span>
            {vehicle.ready ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" /> Hazır
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <LoaderIcon className="h-4 w-4 mr-1 animate-spin" /> Hazır Değil
              </span>
            )}
          </div>
          <button
            className="btn-primary flex items-center space-x-2 mt-4"
            onClick={() => setEditMode(true)}>
            <Edit className="h-4 w-4" />
            <span>Bilgileri Güncelle</span>
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plaka
            </label>
            <input
              type="text"
              name="plate"
              value={form.plate}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mevcut İl
            </label>
            <select
              name="province"
              value={form.province}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              required>
              <option value="">İl seçiniz</option>
              {provinces.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-medium text-gray-700">Hazır mı?</label>
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({ ...prev, ready: !prev.ready }))
              }
              className="focus:outline-none"
              aria-label="Hazır mı?">
              {form.ready ? (
                <ToggleRight className="h-6 w-6 text-green-600" />
              ) : (
                <ToggleLeft className="h-6 w-6 text-gray-400" />
              )}
            </button>
            <span className={form.ready ? "text-green-700" : "text-orange-700"}>
              {form.ready ? "Hazır" : "Hazır Değil"}
            </span>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn-primary flex-1">
              Kaydet
            </button>
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => {
                setEditMode(false);
                setForm(vehicle);
                setError("");
              }}>
              İptal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// --- Yükleyici/İşveren için Profil Kartı ---
function EmployerProfile() {
  // Mock yük ilanları
  const [loads, setLoads] = useState([
    {
      id: 1,
      description: "İstanbul'dan Ankara'ya mobilya taşıma işi.",
      departure: "İstanbul",
      destination: "Ankara",
      status: "Aktif",
    },
    {
      id: 2,
      description: "Bursa'dan İzmir'e elektronik eşya sevkiyatı.",
      departure: "Bursa",
      destination: "İzmir",
      status: "Beklemede",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    description: "",
    departure: "",
    destination: "",
  });
  const [error, setError] = useState("");

  // Form input değişikliği
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Yük ilanı ekleme (mock)
  const handleAddLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.departure || !form.destination) {
      setError("Tüm alanlar zorunludur.");
      return;
    }
    setLoads((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: form.description,
        departure: form.departure,
        destination: form.destination,
        status: "Beklemede",
      },
    ]);
    setForm({ description: "", departure: "", destination: "" });
    setShowForm(false);
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 mr-4">
          <Package className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Yük Veren Profili
        </h2>
      </div>
      <button
        className="btn-primary flex items-center space-x-2 mb-6"
        onClick={() => setShowForm((v) => !v)}>
        <Plus className="h-4 w-4" />
        <span>Yeni Yük İlanı Ver</span>
      </button>
      {showForm && (
        <form onSubmit={handleAddLoad} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              rows={2}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kalkış İli
              </label>
              <select
                name="departure"
                value={form.departure}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                required>
                <option value="">İl seçiniz</option>
                {provinces.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Varış İli
              </label>
              <select
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                required>
                <option value="">İl seçiniz</option>
                {provinces.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn-primary flex-1">
              Kaydet
            </button>
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => {
                setShowForm(false);
                setForm({ description: "", departure: "", destination: "" });
                setError("");
              }}>
              İptal
            </button>
          </div>
        </form>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mevcut Yük İlanlarım
        </h3>
        <div className="space-y-4">
          {loads.length === 0 && (
            <div className="text-gray-500 text-sm">Henüz yük ilanınız yok.</div>
          )}
          {loads.map((load) => (
            <div
              key={load.id}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 mb-1">
                  {load.description}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1 text-blue-600" />
                  {load.departure} → {load.destination}
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    load.status === "Aktif"
                      ? "bg-green-100 text-green-800"
                      : load.status === "Beklemede"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                  {load.status}
                </span>
              </div>
              <button className="btn-secondary flex items-center space-x-1 px-3 py-2">
                <Edit className="h-4 w-4" />
                <span>Güncelle</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Ana Profil Sayfası ---
const ProfilePage = () => {
  // Redux store'dan kullanıcı rolünü al
  const role = useSelector((state: RootState) => state.authUser.role);

  // Roller: VehicleOwner, Pre-VehicleOwner → Araç Sahibi; Loader, Pre-Loader → Yükleyici/İşveren
  let content = null;
  if (role === "VehicleOwner" || role === "Pre-VehicleOwner") {
    content = <VehicleOwnerProfile />;
  } else if (role === "Loader" || role === "Pre-Loader") {
    content = <EmployerProfile />;
  } else {
    content = (
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil</h2>
        <p className="text-gray-600">
          Kullanıcı rolünüz tanımlı değil veya giriş yapmadınız.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      {content}
    </div>
  );
};

export default ProfilePage;
