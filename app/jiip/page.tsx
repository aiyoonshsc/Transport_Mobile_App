
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
  const [statusFilter, setStatusFilter] = useState('전체');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJiip, setEditingJiip] = useState<any>(null);

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
    const matchesStatus = statusFilter === '전체' || jiip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDetailView = (jiip: any) => {
    setEditingJiip(jiip);
    setShowDetailModal(true);
  };

  const handleEdit = (jiip: any) => {
    setEditingJiip(jiip);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // 실제 구현에서는 API 호출
    console.log('Saving jiip:', editingJiip);
    setShowEditModal(false);
    setEditingJiip(null);
  };

  const toggleExpand = (jiipId: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(jiipId)) {
      newExpanded.delete(jiipId);
    } else {
      newExpanded.add(jiipId);
    }
    setExpandedCards(newExpanded);
  };

  const handleDelete = (jiip: any) => {
    if (confirm(`${jiip.jiipNumber} (${jiip.companyName})을(를) 정말 삭제하시겠습니까?`)) {
      alert('삭제되었습니다.');
      // 실제로는 API 호출하여 삭제
    }
  };

  const handleStatusChange = (jiip: any, newStatus: string) => {
    if (confirm(`${jiip.jiipNumber}의 상태를 '${newStatus}'로 변경하시겠습니까?`)) {
      alert(`상태가 '${newStatus}'로 변경되었습니다.`);
      // 실제로는 API 호출하여 상태 변경
    }
  };

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
                onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 !rounded-button text-xs font-medium whitespace-nowrap transition-all ${
                statusFilter === status
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
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDetailView(jiip)}
                      className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <i className="ri-eye-line text-slate-600 text-xs"></i>
                    </button>
                    <button 
                      onClick={() => handleEdit(jiip)}
                      className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <i className="ri-edit-line text-slate-600 text-xs"></i>
                    </button>
                    <button 
                      onClick={() => toggleExpand(jiip.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        expandedCards.has(jiip.id)
                          ? 'bg-slate-300 text-slate-700'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      <i className={`ri-arrow-${expandedCards.has(jiip.id) ? 'up' : 'down'}-s-line`}></i>
                    </button>
                  </div>
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
              {expandedCards.has(jiip.id) && (
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

        {/* Detail Modal */}
        {showDetailModal && editingJiip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">지입 상세정보</h3>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                >
                  <i className="ri-close-line text-slate-600"></i>
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">지입번호</label>
                  <p className="text-slate-900">{editingJiip.jiipNumber}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">회사명</label>
                  <p className="text-slate-900">{editingJiip.companyName}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">대표자</label>
                  <p className="text-slate-900">{editingJiip.ownerName}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">연락처</label>
                  <p className="text-slate-900">{editingJiip.phone}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">주소</label>
                  <p className="text-slate-900">{editingJiip.address}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">상태</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    editingJiip.status === '활성' ? 'bg-green-100 text-green-800' :
                    editingJiip.status === '대기' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {editingJiip.status}
                  </span>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">보유 차량</label>
                  <p className="text-slate-900">{editingJiip.vehicleCount}대</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">등록일</label>
                  <p className="text-slate-900">{editingJiip.registrationDate}</p>
                </div>
                {editingJiip.notes && (
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">비고</label>
                    <p className="text-slate-900">{editingJiip.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingJiip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-4">지입 정보 수정</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">지입번호</label>
                  <input
                    type="text"
                    value={editingJiip.jiipNumber}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">회사명</label>
                  <input
                    type="text"
                    value={editingJiip.companyName}
                    onChange={(e) => setEditingJiip({...editingJiip, companyName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">대표자</label>
                  <input
                    type="text"
                    value={editingJiip.ownerName}
                    onChange={(e) => setEditingJiip({...editingJiip, ownerName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">연락처</label>
                  <input
                    type="text"
                    value={editingJiip.phone}
                    onChange={(e) => setEditingJiip({...editingJiip, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">주소</label>
                  <input
                    type="text"
                    value={editingJiip.address}
                    onChange={(e) => setEditingJiip({...editingJiip, address: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">상태</label>
                  <select
                    value={editingJiip.status}
                    onChange={(e) => setEditingJiip({...editingJiip, status: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="활성">활성</option>
                    <option value="대기">대기</option>
                    <option value="중단">중단</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">비고</label>
                  <textarea
                    value={editingJiip.notes || ''}
                    onChange={(e) => setEditingJiip({...editingJiip, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20 resize-none"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-medium"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-sm font-medium"
                >
                  저장
                </button>
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
