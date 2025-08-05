
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-[\'Pacifico\'] text-5xl font-bold text-blue-600 mb-6">
            운송관리
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            대한민국 운수회사를 위한 통합 운송관리 플랫폼
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            지입번호·차량·차주 정보를 한곳에서 관리하고, 실시간 위치 추적과 스마트 배차로 
            운영 효율을 극대화하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 text-white px-8 py-4 !rounded-button hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              대시보드로 이동
            </Link>
            <Link 
              href="/register" 
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 !rounded-button hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              회원가입
            </Link>
          </div>

          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://readdy.ai/api/search-image?query=Modern%20logistics%20control%20room%20with%20multiple%20screens%20showing%20truck%20locations%20on%20digital%20maps%2C%20professional%20Korean%20transportation%20company%20office%2C%20clean%20bright%20interior%2C%20computers%20displaying%20delivery%20routes%20and%20vehicle%20tracking%20systems%2C%20realistic%20photography%20style%2C%20wide%20angle%20view&width=1200&height=600&seq=hero-transport&orientation=landscape"
              alt="운송관리 플랫폼"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            핵심 기능
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-blue-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20truck%20and%20driver%20management%20system%2C%20vibrant%20blue%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20isometric%20perspective&width=64&height=64&seq=feature1&orientation=squarish"
                  alt="차량관리"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">통합 차량관리</h3>
              <p className="text-gray-600">지입번호, 차량, 차주 정보를 한곳에서 체계적으로 관리</p>
            </div>

            <div className="text-center bg-green-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20GPS%20location%20tracking%20with%20delivery%20truck%2C%20vibrant%20green%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20isometric%20perspective&width=64&height=64&seq=feature2&orientation=squarish"
                  alt="실시간 추적"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">실시간 위치추적</h3>
              <p className="text-gray-600">차량의 실시간 위치를 지도에서 확인하고 모니터링</p>
            </div>

            <div className="text-center bg-purple-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20smart%20dispatch%20system%20with%20documents%20and%20routing%2C%20vibrant%20purple%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20isometric%20perspective&width=64&height=64&seq=feature3&orientation=squarish"
                  alt="스마트 배차"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">스마트 배차</h3>
              <p className="text-gray-600">효율적인 배차 시스템으로 운영 시간과 비용 절감</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            이런 효과를 얻을 수 있어요
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="ri-time-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">배차 시간 75% 단축</h3>
                    <p className="text-gray-600">60분 → 15분으로 배차 소요시간 대폭 감소</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="ri-error-warning-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">배차 오류 80% 감소</h3>
                    <p className="text-gray-600">월 10건 → 2건으로 잘못된 배차 건수 최소화</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="ri-smartphone-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">실시간 소통 강화</h3>
                    <p className="text-gray-600">SMS, 이메일 알림으로 즉시 상황 공유</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://readdy.ai/api/search-image?query=Korean%20transportation%20company%20office%20with%20happy%20manager%20using%20computer%20dashboard%2C%20modern%20workplace%20with%20charts%20and%20graphs%20showing%20improved%20efficiency%2C%20professional%20atmosphere%2C%20realistic%20photography%2C%20bright%20lighting%2C%20success%20and%20productivity%20concept&width=600&height=400&seq=benefits&orientation=landscape"
                alt="운영 효율성"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            지금 시작해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            운송관리의 새로운 기준을 경험해보세요
          </p>
          <Link 
            href="/register" 
            className="bg-white text-blue-600 px-8 py-4 !rounded-button hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
          >
            무료 체험 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
