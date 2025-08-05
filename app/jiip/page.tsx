
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JiipManagement() {
  const [jiipList] = useState([
    { 
      id: 1, 
      jiipNumber: 'J001', 
      companyName: '한국운송(주)',
      ownerName: '김대표',
      ownerPhone: '010-1111-2222',
      registrationDate: '2023-03-15',
      vehicleCount: 3,
      status: '정상',
      vehicleInfo: [
        { plateNumber: '서울12가3456', driverName: '김철수' },
        { plateNumber: '부산34나7890', driverName: '박영희' },
        { plateNumber: '인천56다1234', driverName: '이민수' }
      ]
    },
    { 
      id: 2, 
      jiipNumber: 'J002', 
      companyName: '대한물류',
      ownerName: '이사장',
      ownerPhone: '010-2222-3333',
      registrationDate: '2023-05-20',
      vehicleCount: 2,
      status: '정상',
      vehicleInfo: [
        { plateNumber: '대구78라5678', driverName: '정수진' },
        { plateNumber: '광주90마9012', driverName: '최영수' }
      ]
    },
    { 
      id: 3, 
      jiipNumber: 'J003', 
      companyName: '미래운수',
      ownerName: '박대표',
      ownerPhone: '010-3333-4444',
      registrationDate: '2023-07-10',
      vehicleCount: 1,
      status: '일시정지',
      vehicleInfo: [
        { plateNumber: '울산12바3456', driverName: '홍길동' }
      ]
    },
    { 
      id: 4, 
      jiipNumber: 'J004', 
      companyName: '신속택배',
      ownerName: '조대표',
      ownerPhone: '010-4444-5555',
      registrationDate: '2023-09-05',
      vehicleCount: 4,
      status: '정상',
      vehicleInfo: [
        { plateNumber: '제주34사7890', driverName: '윤기사' },
        { plateNumber: '세종56아1234', driverName: '강기사' },
        { plateNumber: '경기78자5678', driverName: '임기사' },
        { plateNumber: '충남90차9012', driverName: '송기사' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [selectedJiip, setSelectedJiip] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '정상':
        return 'bg-slate-100 text-slate-700';
      case '일시정지':
        return 'bg-slate-200 text-slate-600';
      case '해지':
        return 'bg-slate-300 text-slate-500';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredJiipList = jiipList.filter(jiip => {
    const matchesSearch = jiip.jiipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jiip.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jiip.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '전체' || jiip.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-sm mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">지입 관리 ✨</h1>
              <p className="text-xs text-slate-500 mt-1">우리 회사 지입번호를 관리해보세요</p>
            </div>
            <Link href="/jiip/new" className="bg-slate-900 text-white px-4 py-2 !rounded-button text-sm font-medium shadow-lg hover:bg-slate-800 transition-all">
              <i className="ri-add-line text-sm mr-1"></i>
              등록
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <div className="relative mb-3">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder="지입번호나 회사명 검색 🔍"
              className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 !rounded-button text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['전체', '정상', '일시정지', '해지'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 !rounded-button text-xs font-medium whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {status === '전체' ? '🏢 전체' : status === '정상' ? '✅ 정상' : status === '일시정지' ? '⏸️ 일시정지' : '❌ 해지'}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">전체 지입</p>
                <p className="text-2xl font-bold text-slate-900">{jiipList.length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-building-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">정상 운영</p>
                <p className="text-2xl font-bold text-slate-900">{jiipList.filter(j => j.status === '정상').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">전체 차량</p>
                <p className="text-2xl font-bold text-slate-900">{jiipList.reduce((sum, jiip) => sum + jiip.vehicleCount, 0)}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-truck-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">평균 보유</p>
                <p className="text-2xl font-bold text-slate-900">{Math.round(jiipList.reduce((sum, jiip) => sum + jiip.vehicleCount, 0) / jiipList.length * 10) / 10}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-bar-chart-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Jiip Cards */}
        <div className="space-y-4">
          {filteredJiipList.map((jiip) => (
            <div key={jiip.id} className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-700">{jiip.jiipNumber}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{jiip.companyName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(jiip.status)}`}>
                        {jiip.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedJiip(selectedJiip === jiip.id ? null : jiip.id)}
                    className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                  >
                    <i className={`ri-arrow-${selectedJiip === jiip.id ? 'up' : 'down'}-s-line text-slate-600`}></i>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <i className="ri-user-line text-slate-400 text-sm w-4"></i>
                    <span className="text-sm text-slate-700">{jiip.ownerName}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{jiip.ownerPhone}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-truck-line text-slate-400 text-sm w-4"></i>
                      <span className="text-sm text-slate-700">차량 {jiip.vehicleCount}대</span>
                    </div>
                    <span className="text-xs text-slate-500">{jiip.registrationDate}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Link 
                      href={`/vehicles?jiip=${jiip.jiipNumber}`}
                      className="flex-1 bg-white text-slate-700 py-2 px-3 !rounded-button text-xs font-medium text-center hover:bg-slate-100 transition-colors border border-slate-200"
                    >
                      🚛 차량관리
                    </Link>
                    <button className="flex-1 bg-slate-900 text-white py-2 px-3 !rounded-button text-xs font-medium hover:bg-slate-800 transition-colors">
                      ➕ 차량추가
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Vehicle List */}
              {selectedJiip === jiip.id && (
                <div className="border-t border-slate-200 bg-white px-5 py-4">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
                    <i className="ri-truck-line mr-2 text-slate-500"></i>
                    보유 차량 ({jiip.vehicleCount}대)
                  </h4>
                  <div className="space-y-3">
                    {jiip.vehicleInfo.map((vehicle, index) => (
                      <div key={index} className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{vehicle.plateNumber}</div>
                            <div className="text-xs text-slate-600 flex items-center mt-1">
                              <i className="ri-user-line mr-1"></i>
                              {vehicle.driverName}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button className="w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors">
                              <i className="ri-edit-line text-xs"></i>
                            </button>
                            <button className="w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors">
                              <i className="ri-map-pin-line text-xs"></i>
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full font-medium">
                            ✅ 정상
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Vehicle Card */}
                    <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
                      <i className="ri-add-line text-2xl text-slate-400 mb-2 block"></i>
                      <span className="text-sm text-slate-500">새 차량 추가하기</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredJiipList.length === 0 && (
          <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-200">
            <i className="ri-building-line text-4xl text-slate-300 mb-4 block"></i>
            <p className="text-slate-600 mb-2 text-sm">조건에 맞는 지입이 없어요 🤔</p>
            <p className="text-xs text-slate-500">검색어나 필터를 바꿔보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
