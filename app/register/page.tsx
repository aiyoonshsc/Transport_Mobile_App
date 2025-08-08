'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Google OAuth 설정
const GOOGLE_CLIENT_ID = '917844517162-tmnlsfmu1j9bkc5c3c00d5pogbjo4euj.apps.googleusercontent.com';

type UserType = 'transport' | 'driver' | 'shipper';

export default function Register() {
  const [userType, setUserType] = useState<UserType>('transport');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'social'>('email');
  
  // 전화번호 인증 관련 상태
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: 기본정보, 2: 전화번호 인증

  // 전화번호 인증 관련 함수들
  const sendVerificationCode = () => {
    if (!phoneNumber.match(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/)) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setIsCodeSent(true);
    setTimer(180); // 3분
    setIsTimerActive(true);
    
    // 실제 SMS 발송 로직 (현재는 콘솔에 출력)
    console.log(`SMS 발송: ${phoneNumber}로 인증번호 ${code} 발송`);
    alert(`개발자 모드: 인증번호는 ${code}입니다.`);
  };

  const verifyCode = () => {
    if (timer <= 0) {
      alert('인증번호가 만료되었습니다. 다시 발송해주세요.');
      return;
    }
    
    if (verificationCode === generatedCode) {
      setIsPhoneVerified(true);
      setIsTimerActive(false);
      alert('전화번호 인증이 완료되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다.');
      setVerificationCode('');
    }
  };

  // 타이머 효과
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setIsCodeSent(false);
      setVerificationCode('');
      setGeneratedCode('');
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isPhoneVerified) {
      alert('전화번호 인증을 완료해주세요.');
      return;
    }
    // 다음 단계로 이동 (상세 정보 입력 페이지)
    const userData = {
      userType,
      email,
      password,
      phoneNumber
    };
    localStorage.setItem('tempUserData', JSON.stringify(userData));
    window.location.href = '/register/details';
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 로그인`);
    
    // 실제 소셜 로그인 구현
    if (provider === 'google') {
      // Google OAuth 2.0 구현
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const state = btoa(JSON.stringify({ userType }));
      
      const googleAuthUrl = `https://accounts.google.com/oauth/authorize?` +
        `client_id=${GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=openid email profile&` +
        `state=${state}`;
      
      console.log('Google OAuth 설정:');
      console.log('- Client ID:', GOOGLE_CLIENT_ID);
      console.log('- Redirect URI:', redirectUri);
      console.log('- State:', state);
      console.log('- Full URL:', googleAuthUrl);
      
      window.location.href = googleAuthUrl;
    } else if (provider === 'kakao') {
      // Kakao OAuth 구현
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?` +
        `client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/kakao/callback')}&` +
        `response_type=code&` +
        `state=${btoa(JSON.stringify({ userType }))}`;
      
      window.location.href = kakaoAuthUrl;
    } else if (provider === 'naver') {
      // Naver OAuth 구현
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?` +
        `client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/naver/callback')}&` +
        `response_type=code&` +
        `state=${btoa(JSON.stringify({ userType }))}`;
      
      window.location.href = naverAuthUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-['Pacifico'] text-3xl font-bold text-blue-600 mb-2">운송관리</h1>
            <p className="text-gray-600">회원가입</p>
          </div>

          {/* 회원 유형 선택 */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">회원 유형을 선택하세요</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setUserType('transport')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  userType === 'transport'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-2">🚛</div>
                <div className="font-medium">운송회사</div>
                <div className="text-sm text-gray-600">지입회사 담당자</div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('driver')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  userType === 'driver'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-2">👨‍💼</div>
                <div className="font-medium">기사</div>
                <div className="text-sm text-gray-600">개인 기사</div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('shipper')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  userType === 'shipper'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-medium">화주회사</div>
                <div className="text-sm text-gray-600">화주회사 담당자</div>
              </button>
            </div>
          </div>

          {/* 로그인 방법 선택 */}
          <div className="mb-6">
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  loginMethod === 'email'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                이메일로 가입
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('social')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  loginMethod === 'social'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                소셜 계정으로 가입
              </button>
            </div>
          </div>

          {loginMethod === 'email' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 주소 *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 전화번호 인증 섹션 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 *
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="tel"
                      className={`flex-1 px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isPhoneVerified || isTimerActive ? 'bg-gray-100 text-gray-500' : ''
                      }`}
                      placeholder="010-1234-5678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={isPhoneVerified || isTimerActive}
                      required
                    />
                    <button
                      type="button"
                      onClick={sendVerificationCode}
                      disabled={isPhoneVerified || isTimerActive || !phoneNumber}
                      className={`px-6 py-3 !rounded-button font-medium transition-colors ${
                        isPhoneVerified
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : isTimerActive
                          ? 'bg-gray-100 text-gray-500 border border-gray-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isPhoneVerified
                        ? '인증완료'
                        : isTimerActive
                        ? `재발송 (${formatTime(timer)})`
                        : '인증번호 발송'
                      }
                    </button>
                  </div>
                </div>

                {isCodeSent && !isPhoneVerified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      인증번호 입력 *
                      {timer > 0 && (
                        <span className={`ml-2 text-sm ${
                          timer <= 30 ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          ({formatTime(timer)})
                        </span>
                      )}
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 border border-gray-300 !rounded-button focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="6자리 인증번호 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        disabled={timer <= 0}
                      />
                      <button
                        type="button"
                        onClick={verifyCode}
                        disabled={verificationCode.length !== 6 || timer <= 0}
                        className="px-6 py-3 bg-blue-600 text-white !rounded-button hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:text-gray-500"
                      >
                        인증확인
                      </button>
                    </div>
                    {timer <= 0 && (
                      <p className="text-red-500 text-sm mt-2">
                        인증번호가 만료되었습니다. 다시 발송해주세요.
                      </p>
                    )}
                  </div>
                )}
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
                다음 단계로
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* 구글 로그인 */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 !rounded-button bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 계속하기
              </button>

              {/* 카카오 로그인 */}
              <button
                type="button"
                onClick={() => handleSocialLogin('kakao')}
                className="w-full flex items-center justify-center px-4 py-3 !rounded-button bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-medium"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
                </svg>
                카카오로 계속하기
              </button>

              {/* 네이버 로그인 */}
              <button
                type="button"
                onClick={() => handleSocialLogin('naver')}
                className="w-full flex items-center justify-center px-4 py-3 !rounded-button bg-green-500 hover:bg-green-600 transition-colors text-white font-medium"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
                네이버로 계속하기
              </button>

              <div className="mt-6">
                <div className="flex items-start">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 !rounded-button mt-1" required />
                  <span className="ml-3 text-sm text-gray-600">
                    <Link href="/terms" className="text-blue-600 hover:text-blue-800">이용약관</Link> 및{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800">개인정보처리방침</Link>에 동의합니다.
                  </span>
                </div>
              </div>
            </div>
          )}

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