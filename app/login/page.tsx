'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('로그인 시도:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-['Pacifico'] text-3xl font-bold text-blue-600 mb-2">운송관리</h1>
            <p className="text-gray-600">운수회사 통합 관리 플랫폼</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 주소
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 !rounded-button" />
                <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                비밀번호 찾기
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 !rounded-button hover:bg-blue-700 transition-colors font-medium"
            >
              로그인
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 !rounded-button hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <i className="ri-google-fill text-xl text-red-500"></i>
              <span>Google로 로그인</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}