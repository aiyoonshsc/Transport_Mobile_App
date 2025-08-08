'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          throw new Error('Kakao 로그인이 취소되었습니다.');
        }

        if (!code || !state) {
          throw new Error('인증 정보가 올바르지 않습니다.');
        }

        // state에서 userType 추출
        const { userType } = JSON.parse(atob(state));

        // API 라우트를 통해 토큰 및 사용자 정보 요청
        const response = await fetch('/api/auth/kakao/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            redirect_uri: `${window.location.origin}/auth/kakao/callback`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '인증 처리에 실패했습니다.');
        }

        const { user: userData } = await response.json();

        // 임시 사용자 데이터 저장
        const tempUserData = {
          userType,
          email: userData.email,
          name: userData.name,
          provider: 'kakao',
          providerId: userData.id,
          profileImage: userData.picture,
        };

        localStorage.setItem('tempUserData', JSON.stringify(tempUserData));
        
        // 상세 정보 입력 페이지로 이동
        router.push('/register/details');
      } catch (err) {
        console.error('Kakao 로그인 오류:', err);
        setError(err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    handleKakaoCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Kakao 로그인 처리 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="text-yellow-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">로그인 오류</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/register')}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            회원가입 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default function KakaoCallback() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <KakaoCallbackContent />
    </Suspense>
  );
}