'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserType = 'transport' | 'driver' | 'shipper';

interface TempUserData {
  userType: UserType;
  email?: string;
  password?: string;
  provider?: string;
}

export default function RegisterDetails() {
  const router = useRouter();
  const [tempUserData, setTempUserData] = useState<TempUserData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    // 회사 관련 필드
    companyName: '',
    businessNumber: '',
    address: '',
    // 기사 개인 필드
    licenseNumber: '',
    vehicleNumber: '',
    vehicleType: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('tempUserData');
    if (userData) {
      setTempUserData(JSON.parse(userData));
    } else {
      // 임시 데이터가 없으면 회원가입 페이지로 리다이렉트
      router.push('/register');
    }
  }, [router]);

  // 타이머 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setIsCodeSent(false);
            setVerificationCode('');
            setGeneratedCode('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // 타이머 포맷팅 함수
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendVerificationCode = () => {
    if (!phoneNumber) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    
    // 전화번호 형식 검증
    const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phoneNumber.replace(/-/g, ''))) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }
    
    // 6자리 랜덤 인증번호 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    // 실제 SMS 발송 로직 (여기서는 콘솔에 출력)
    console.log(`[SMS 발송] ${phoneNumber}로 인증번호 ${code}가 발송되었습니다.`);
    
    setIsCodeSent(true);
    setTimer(180); // 3분 타이머
    setIsTimerActive(true);
    
    alert(`인증번호가 발송되었습니다.\n개발 모드: ${code}`);
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    
    if (timer <= 0) {
      alert('인증번호가 만료되었습니다. 다시 발송해주세요.');
      return;
    }
    
    // 인증번호 확인
    if (verificationCode === generatedCode) {
      setIsPhoneVerified(true);
      setIsTimerActive(false);
      setFormData({...formData, phone: phoneNumber});
      alert('전화번호 인증이 완료되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다.');
      setVerificationCode('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneVerified) {
      alert('전화번호 인증을 완료해주세요.');
      return;
    }

    // 최종 회원가입 데이터 구성
    const finalUserData = {
      ...tempUserData,
      ...formData
    };

    console.log('최종 회원가입 데이터:', finalUserData);
    
    // 임시 데이터 삭제
    localStorage.removeItem('tempUserData');
    
    // 회원가입 완료 후 로그인 페이지로 이동
    alert('회원가입이 완료되었습니다!');
    router.push('/login');
  };

  if (!tempUserData) {
    return <div>로딩 중...</div>;
  }

  const getUserTypeText = () => {
    switch (tempUserData.userType) {
      case 'transport': return '운송회사 담당자';
      case 'driver': return '기사';
      case 'shipper': return '화주회사 담당자';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              상세 정보 입력
            </h1>
            <p className="text-gray-600">
              {getUserTypeText()} 회원가입을 위한 추가 정보를 입력해주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 전화번호 인증 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">전화번호 인증</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 *
                  </label>
                  <div className="flex space-x-2">
                      <input
                        type="tel"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="010-0000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={isPhoneVerified}
                        required
                      />
                      <button
                        type="button"
                        onClick={handleSendVerificationCode}
                        disabled={isPhoneVerified || isTimerActive}
                        className={`px-4 py-3 rounded-lg transition-colors ${
                          isPhoneVerified || isTimerActive
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isTimerActive ? `재발송 (${formatTimer(timer)})` : isCodeSent ? '재발송' : '인증번호 발송'}
                      </button>
                    </div>
                </div>

                {isCodeSent && !isPhoneVerified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      인증번호 * {isTimerActive && (
                        <span className={`text-sm ${
                          timer <= 30 ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          ({formatTimer(timer)})
                        </span>
                      )}
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="인증번호 6자리"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        disabled={timer <= 0}
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={timer <= 0 || verificationCode.length !== 6}
                        className={`px-4 py-3 rounded-lg transition-colors ${
                          timer <= 0 || verificationCode.length !== 6
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        인증확인
                      </button>
                    </div>
                    {timer <= 0 && (
                      <p className="text-red-500 text-sm mt-2">⚠ 인증번호가 만료되었습니다. 다시 발송해주세요.</p>
                    )}
                  </div>
                )}

                {isPhoneVerified && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    전화번호 인증이 완료되었습니다.
                  </div>
                )}
              </div>
            </div>

            {/* 개인 정보 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tempUserData.userType === 'driver' ? '기사명' : '담당자명'} *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={tempUserData.userType === 'driver' ? '기사명을 입력하세요' : '담당자명을 입력하세요'}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {/* 회사 정보 (운송회사, 화주회사) */}
            {(tempUserData.userType === 'transport' || tempUserData.userType === 'shipper') && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      회사명 *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="000-00-00000"
                      value={formData.businessNumber}
                      onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="회사 주소를 입력하세요"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </>
            )}

            {/* 기사 전용 필드 */}
            {tempUserData.userType === 'driver' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    운전면허번호 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="운전면허번호를 입력하세요"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      차량번호
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="00가0000"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      차량종류
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    >
                      <option value="">선택하세요</option>
                      <option value="1톤">1톤</option>
                      <option value="2.5톤">2.5톤</option>
                      <option value="3.5톤">3.5톤</option>
                      <option value="5톤">5톤</option>
                      <option value="8톤">8톤</option>
                      <option value="11톤">11톤</option>
                      <option value="25톤">25톤</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                이전 단계
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                회원가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}