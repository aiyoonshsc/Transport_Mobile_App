
'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function VehiclesContent() {
  const searchParams = useSearchParams();
  const jiipFilter = searchParams.get('jiip');
  
  const [vehicles] = useState([
    { 
      id: 1, 
      plateNumber: '서울12가3456', 
      jiipNumber: 'J001', 
      driverName: '김철수', 
      driverPhone: '010-1234-5678',
      vehicleType: '1톤', 
      status: '운행중',
      location: '경부고속도로 대전IC',
      lastUpdate: '2024-01-15 14:30'
    },
    { 
      id: 2, 
      plateNumber: '부산34나7890', 
      jiipNumber: 'J002', 
      driverName: '박영희', 
      driverPhone: '010-2345-6789',
      vehicleType: '2.5톤', 
      status: '대기중',
      location: '회사 차고지',
      lastUpdate: '2024-01-15 13:45'
    },
    { 
      id: 3, 
      plateNumber: '인천56다1234', 
      jiipNumber: 'J003', 
      driverName: '이민수', 
      driverPhone: '010-3456-7890',
      vehicleType: '3톤', 
      status: '하역중',
      location: '광주광역시 북구',
      lastUpdate: '2024-01-15 15:10'
    },
    { 
      id: 4, 
      plateNumber: '대구78라5678', 
      jiipNumber: 'J004', 
      driverName: '정수진', 
      driverPhone: '010-4567-8901',
      vehicleType: '5톤', 
      status: '정비중',
      location: '정비소',
      lastUpdate: '2024-01-15 09:20'
    },
    { 
      id: 5, 
      plateNumber: '제주90마1234', 
      jiipNumber: 'J001', 
      driverName: '홍길동', 
      driverPhone: '010-5678-9012',
      vehicleType: '4.5톤', 
      status: '운행중',
      location: '남해고속도로 진주IC',
      lastUpdate: '2024-01-15 16:20'
    },
    { 
      id: 6, 
      plateNumber: '경기34바5678', 
      jiipNumber: 'J002', 
      driverName: '윤기사', 
      driverPhone: '010-6789-0123',
      vehicleType: '2톤', 
      status: '대기중',
      location: '인천항 부두',
      lastUpdate: '2024-01-15 12:15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingVehicle, setDeletingVehicle] = useState<any>(null);

  const handleEdit = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setShowEditModal(true);
  };

  const handleDelete = (vehicle: any) => {
    setDeletingVehicle(vehicle);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    // 실제 구현에서는 API 호출
    console.log('차량 정보 수정:', editingVehicle);
    setShowEditModal(false);
    setEditingVehicle(null);
  };

  const handleConfirmDelete = () => {
    // 실제 구현에서는 API 호출
    console.log('차량 삭제:', deletingVehicle);
    setShowDeleteModal(false);
    setDeletingVehicle(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '운행중':
        return 'bg-slate-200 text-slate-600';
      case '대기중':
        return 'bg-slate-100 text-slate-700';
      case '하역중':
        return 'bg-slate-200 text-slate-600';
      case '정비중':
        return 'bg-slate-300 text-slate-500';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.jiipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '전체' || vehicle.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-sm mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">차량 관리 ✨</h1>
              <p className="text-xs text-slate-500 mt-1">차량과 차주 정보를 관리해보세요</p>
            </div>
            <Link href="/vehicles/new" className="bg-slate-900 text-white px-4 py-2 !rounded-button text-sm font-medium shadow-lg hover:bg-slate-800 transition-all">
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
              placeholder="차량번호나 차주명 검색 🔍"
              className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 !rounded-button text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['전체', '운행중', '대기중', '하역중', '정비중'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 !rounded-button text-xs font-medium whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {status === '전체' ? '🚛 전체' : status === '운행중' ? '🚛 운행중' : status === '대기중' ? '⏸️ 대기' : status === '하역중' ? '📦 하역' : '🔧 정비'}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">전체 차량</p>
                <p className="text-2xl font-bold text-slate-900">{vehicles.length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-truck-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">운행중</p>
                <p className="text-2xl font-bold text-slate-900">{vehicles.filter(v => v.status === '운행중').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-steering-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">대기중</p>
                <p className="text-2xl font-bold text-slate-900">{vehicles.filter(v => v.status === '대기중').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-parking-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">정비중</p>
                <p className="text-2xl font-bold text-slate-900">{vehicles.filter(v => v.status === '정비중').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-tools-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="space-y-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-700">{vehicle.jiipNumber}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{vehicle.plateNumber}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors">
                    <i className="ri-more-line text-slate-600"></i>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">차량 종류</p>
                      <p className="text-sm text-slate-700 font-medium">{vehicle.vehicleType}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">차주</p>
                      <p className="text-sm text-slate-700 font-medium">{vehicle.driverName}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">연락처</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">{vehicle.driverPhone}</span>
                      <div className="flex space-x-1">
                        <button className="w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                          <i className="ri-phone-line text-xs"></i>
                        </button>
                        <button className="w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                          <i className="ri-message-line text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">현재 위치</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 truncate">{vehicle.location}</p>
                        <p className="text-xs text-slate-500 mt-1">업데이트: {vehicle.lastUpdate}</p>
                      </div>
                      <button className="w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors ml-2">
                        <i className="ri-map-pin-line text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 bg-white text-slate-700 py-2 px-3 !rounded-button text-xs font-medium text-center hover:bg-slate-100 transition-colors border border-slate-200">
                      📍 위치확인
                    </button>
                    <button 
                      onClick={() => handleEdit(vehicle)}
                      className="flex-1 bg-slate-900 text-white py-2 px-3 !rounded-button text-xs font-medium hover:bg-slate-800 transition-colors"
                    >
                      ✏️ 수정
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle)}
                      className="w-10 bg-red-500 text-white py-2 px-3 !rounded-button text-xs font-medium hover:bg-red-600 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-200">
            <i className="ri-truck-line text-4xl text-slate-300 mb-4 block"></i>
            <p className="text-slate-600 mb-2 text-sm">조건에 맞는 차량이 없어요 🤔</p>
            <p className="text-xs text-slate-500">검색어나 필터를 바꿔보세요</p>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">차량 정보 수정</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">차량번호</label>
                  <input
                    type="text"
                    value={editingVehicle.plateNumber}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">기사명</label>
                  <input
                    type="text"
                    value={editingVehicle.driverName}
                    onChange={(e) => setEditingVehicle({...editingVehicle, driverName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">연락처</label>
                  <input
                    type="text"
                    value={editingVehicle.driverPhone}
                    onChange={(e) => setEditingVehicle({...editingVehicle, driverPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
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

        {/* Delete Modal */}
        {showDeleteModal && deletingVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">차량 삭제</h3>
              <p className="text-sm text-slate-600 mb-6">
                <strong>{deletingVehicle.plateNumber}</strong> 차량을 삭제하시겠습니까?<br/>
                이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl text-sm font-medium"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl text-sm font-medium"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <VehiclesContent />
    </Suspense>
  );
}
