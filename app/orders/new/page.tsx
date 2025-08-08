'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewOrder() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    fromAddress: '',
    toAddress: '',
    cargoType: '',
    weight: '',
    scheduledDate: '',
    scheduledTime: '',
    urgency: '일반',
    specialInstructions: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const cargoTypes = ['전자제품', '기계부품', '식품', '화학용품', '농산물', '의류', '가구', '기타'];
  const urgencyLevels = ['일반', '긴급', '당일배송'];

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
    if (!formData.customerName || !formData.customerPhone || !formData.fromAddress || !formData.toAddress || !formData.cargoType || !formData.weight || !formData.scheduledDate || !formData.scheduledTime) {
      alert('필수 항목을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // 전화번호 형식 검사
    const phoneRegex = /^(\d{2,3}-\d{3,4}-\d{4}|010-\d{4}-\d{4})$/;
    if (!phoneRegex.test(formData.customerPhone)) {
      alert('올바른 전화번호 형식으로 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // 날짜 검사 (오늘 이후만 가능)
    const selectedDate = new Date(formData.scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      alert('배송일은 오늘 이후로 선택해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 주문번호 생성 (실제로는 서버에서 생성)
      const orderNumber = 'ORD' + String(Date.now()).slice(-6);
      
      alert(`주문이 성공적으로 등록되었습니다!\n주문번호: ${orderNumber}`);
      router.push('/orders');
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 오늘 날짜를 YYYY-MM-DD 형식으로 반환
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-sm mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Link href="/orders" className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                <i className="ri-arrow-left-line text-slate-600 text-sm"></i>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">주문 등록 ✨</h1>
                <p className="text-xs text-slate-500 mt-1">새로운 화물 주문을 등록해보세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 고객 정보 섹션 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <i className="ri-user-line text-slate-600 mr-2"></i>
              고객 정보
            </h3>
            
            <div className="space-y-3">
              {/* 고객명 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  고객명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="예: (주)한국물류"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>

              {/* 고객 연락처 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="02-0000-0000 또는 010-0000-0000"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="example@company.com"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 배송 정보 섹션 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <i className="ri-truck-line text-slate-600 mr-2"></i>
              배송 정보
            </h3>
            
            <div className="space-y-3">
              {/* 출발지 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  출발지 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fromAddress"
                  value={formData.fromAddress}
                  onChange={handleInputChange}
                  placeholder="예: 서울시 강남구 테헤란로 123"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>

              {/* 도착지 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  도착지 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="toAddress"
                  value={formData.toAddress}
                  onChange={handleInputChange}
                  placeholder="예: 부산시 해운대구 센텀중앙로 45"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* 화물 정보 섹션 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <i className="ri-package-line text-slate-600 mr-2"></i>
              화물 정보
            </h3>
            
            <div className="space-y-3">
              {/* 화물 종류 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  화물 종류 <span className="text-red-500">*</span>
                </label>
                <select
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                >
                  <option value="">화물 종류를 선택하세요</option>
                  {cargoTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* 중량 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  중량 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="예: 2.5톤"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* 일정 정보 섹션 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <i className="ri-calendar-line text-slate-600 mr-2"></i>
              일정 정보
            </h3>
            
            <div className="space-y-3">
              {/* 배송 날짜 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  배송 날짜 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>

              {/* 배송 시간 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  배송 시간 <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                  required
                />
              </div>

              {/* 긴급도 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  긴급도
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
                >
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 특별 지시사항 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              특별 지시사항
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              placeholder="예: 깨지기 쉬운 물품, 조심히 운송 요망"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all resize-none"
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
                <>주문 등록하기</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}