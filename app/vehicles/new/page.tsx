'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewVehicle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    plateNumber: '',
    jiipNumber: '',
    driverName: '',
    driverPhone: '',
    driverLicense: '',
    vehicleType: '',
    vehicleModel: '',
    vehicleYear: '',
    maxWeight: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 지입번호 목록 (실제로는 API에서 가져와야 함)
  const jiipNumbers = ['J001', 'J002', 'J003', 'J004'];
  const vehicleTypes = ['1톤', '1.4톤', '2.5톤', '3톤', '4.5톤', '5톤', '11톤', '25톤'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 유효성 검사
    if (!formData.plateNumber || !formData.jiipNumber || !formData.driverName || !formData.driverPhone || !formData.vehicleType) {
      alert('필수 항목을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // 전화번호 형식 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.driverPhone)) {
      alert('전화번호는 010-0000-0000 형식으로 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('차량이 성공적으로 등록되었습니다!');
      router.push('/vehicles');
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-sm mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Link href="/vehicles" className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                <i className="ri-arrow-left-line text-slate-600 text-sm"></i>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">차량 등록 ✨</h1>
                <p className="text-xs text-slate-500 mt-1">새로운 차량을 등록해보세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 차량번호 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              차량번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleInputChange}
              placeholder="예: 서울12가3456"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 지입번호 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              지입번호 <span className="text-red-500">*</span>
            </label>
            <select
              name="jiipNumber"
              value={formData.jiipNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            >
              <option value="">지입번호를 선택하세요</option>
              {jiipNumbers.map(jiip => (
                <option key={jiip} value={jiip}>{jiip}</option>
              ))}
            </select>
          </div>

          {/* 차주명 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              차주명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleInputChange}
              placeholder="예: 김철수"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 차주 연락처 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              차주 연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="driverPhone"
              value={formData.driverPhone}
              onChange={handleInputChange}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 운전면허번호 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              운전면허번호
            </label>
            <input
              type="text"
              name="driverLicense"
              value={formData.driverLicense}
              onChange={handleInputChange}
              placeholder="예: 11-00-000000-00"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
            />
          </div>

          {/* 차량 톤수 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              차량 톤수 <span className="text-red-500">*</span>
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            >
              <option value="">톤수를 선택하세요</option>
              {vehicleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* 차량 모델 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              차량 모델
            </label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              placeholder="예: 현대 포터II"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
            />
          </div>

          {/* 연식 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              연식
            </label>
            <input
              type="number"
              name="vehicleYear"
              value={formData.vehicleYear}
              onChange={handleInputChange}
              placeholder="예: 2020"
              min="1990"
              max="2024"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
            />
          </div>

          {/* 최대 적재량 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              최대 적재량 (kg)
            </label>
            <input
              type="number"
              name="maxWeight"
              value={formData.maxWeight}
              onChange={handleInputChange}
              placeholder="예: 1000"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
            />
          </div>

          {/* 메모 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              메모
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="추가 정보나 특이사항을 입력하세요"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-medium text-sm shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>등록 중...</span>
                </div>
              ) : (
                <>등록하기</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}