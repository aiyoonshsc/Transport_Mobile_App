'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    managerName: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 구현
    console.log('회원가입 시도:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-['Pacifico'] text-3xl font-bold text-blue-600 mb-2">운송관리</h1>
            <p className="text-gray-600">운수회사 등록</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회사명 *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="회사명을 입력하세요"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사업자등록번호 *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="000-00-00000"
                  value={formData.businessNumber}
                  onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 주소 *
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 *
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 확인 *
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="담당자명을 입력하세요"
                  value={formData.managerName}
                  onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사 주소
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="회사 주소를 입력하세요"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 !rounded-button mt-1" required />
              <span className="ml-3 text-sm text-gray-600">
                <Link href="/terms" className="text-blue-600 hover:text-blue-800">이용약관</Link> 및{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800">개인정보처리방침</Link>에 동의합니다.
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 !rounded-button hover:bg-blue-700 transition-colors font-medium"
            >
              회원가입
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}