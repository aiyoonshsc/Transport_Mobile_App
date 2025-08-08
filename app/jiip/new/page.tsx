'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewJiip() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jiipNumber: '',
    companyName: '',
    ownerName: '',
    ownerPhone: '',
    businessNumber: '',
    address: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.jiipNumber || !formData.companyName || !formData.ownerName || !formData.ownerPhone) {
      alert('필수 항목을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // 전화번호 형식 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.ownerPhone)) {
      alert('전화번호는 010-0000-0000 형식으로 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('지입번호가 성공적으로 등록되었습니다!');
      router.push('/jiip');
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
              <Link href="/jiip" className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                <i className="ri-arrow-left-line text-slate-600 text-sm"></i>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">지입 등록 ✨</h1>
                <p className="text-xs text-slate-500 mt-1">새로운 지입번호를 등록해보세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 지입번호 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              지입번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="jiipNumber"
              value={formData.jiipNumber}
              onChange={handleInputChange}
              placeholder="예: J001"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 회사명 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              회사명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="예: 한국운송(주)"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 대표자명 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              대표자명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="예: 김대표"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 연락처 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              required
            />
          </div>

          {/* 사업자번호 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              사업자번호
            </label>
            <input
              type="text"
              name="businessNumber"
              value={formData.businessNumber}
              onChange={handleInputChange}
              placeholder="000-00-00000"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
            />
          </div>

          {/* 주소 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              주소
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="예: 서울시 강남구 테헤란로 123"
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