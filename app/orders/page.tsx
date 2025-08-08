
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState<any>(null);

  // Mock data
  const orderList = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerName: '삼성전자',
      customerPhone: '02-1234-5678',
      customerEmail: 'contact@samsung.com',
      pickupAddress: '서울시 강남구 테헤란로 123',
      pickupContact: '김담당자',
      pickupPhone: '02-1234-5679',
      deliveryAddress: '부산시 해운대구 센텀로 456',
      deliveryContact: '이담당자',
      deliveryPhone: '051-1234-5678',
      cargoType: '전자제품',
      cargoDescription: 'TV 및 가전제품',
      weight: '500kg',
      volume: '10㎥',
      specialInstructions: '파손주의',
      status: '배송중',
      assignedVehicle: '서울12가3456',
      driverName: '김운전',
      driverPhone: '010-1234-5678',
      scheduledDate: '2024-01-15',
      scheduledTime: '09:00',
      estimatedDelivery: '2024-01-15 18:00',
      createdDate: '2024-01-14',
      price: 150000,
      notes: '정시 배송 요청'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'LG화학',
      customerPhone: '02-2345-6789',
      customerEmail: 'logistics@lgchem.com',
      pickupAddress: '경기도 성남시 분당구 판교로 789',
      pickupContact: '박담당자',
      pickupPhone: '031-2345-6789',
      deliveryAddress: '대구시 달서구 성서로 321',
      deliveryContact: '최담당자',
      deliveryPhone: '053-2345-6789',
      cargoType: '화학제품',
      cargoDescription: '산업용 화학원료',
      weight: '1200kg',
      volume: '5㎥',
      specialInstructions: '위험물 취급주의',
      status: '대기중',
      assignedVehicle: null,
      driverName: null,
      driverPhone: null,
      scheduledDate: '2024-01-16',
      scheduledTime: '10:00',
      estimatedDelivery: null,
      createdDate: '2024-01-15',
      price: 200000,
      notes: '위험물 운송 자격 필요'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customerName: '현대자동차',
      customerPhone: '02-3456-7890',
      customerEmail: 'parts@hyundai.com',
      pickupAddress: '울산시 남구 여천로 654',
      pickupContact: '정담당자',
      pickupPhone: '052-3456-7890',
      deliveryAddress: '광주시 북구 첨단로 987',
      deliveryContact: '한담당자',
      deliveryPhone: '062-3456-7890',
      cargoType: '자동차부품',
      cargoDescription: '엔진 부품 및 액세서리',
      weight: '800kg',
      volume: '8㎥',
      specialInstructions: '정밀부품 주의',
      status: '완료',
      assignedVehicle: '부산56다7890',
      driverName: '박운송',
      driverPhone: '010-3456-7890',
      scheduledDate: '2024-01-13',
      scheduledTime: '08:00',
      estimatedDelivery: '2024-01-13 16:00',
      createdDate: '2024-01-12',
      price: 180000,
      notes: '배송 완료'
    }
  ];

  const filteredOrderList = orderList.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.driverName && order.driverName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === '전체' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '대기중': return 'bg-yellow-100 text-yellow-800';
      case '배송중': return 'bg-blue-100 text-blue-800';
      case '완료': return 'bg-green-100 text-green-800';
      case '취소': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDetailView = (order: any) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = (order: any) => {
    setDeletingOrder(order);
    setShowDeleteModal(true);
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    // 실제 구현에서는 API 호출
    console.log('주문 상태 변경:', orderId, newStatus);
  };

  const handleSaveEdit = () => {
    // 실제 구현에서는 API 호출
    console.log('주문 정보 수정:', editingOrder);
    setShowEditModal(false);
    setEditingOrder(null);
  };

  const handleConfirmDelete = () => {
    // 실제 구현에서는 API 호출
    console.log('주문 삭제:', deletingOrder);
    setShowDeleteModal(false);
    setDeletingOrder(null);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-sm mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">주문 관리 ✨</h1>
              <p className="text-xs text-slate-500 mt-1">화물 주문을 관리해보세요</p>
            </div>
            <Link href="/orders/new" className="bg-slate-900 text-white px-4 py-2 !rounded-button text-sm font-medium shadow-lg hover:bg-slate-800 transition-all">
              <i className="ri-add-line text-sm mr-1"></i>
              주문
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <div className="relative mb-3">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder="주문번호나 고객명 검색 🔍"
              className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 !rounded-button text-sm focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['전체', '대기중', '배송중', '완료', '취소'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 !rounded-button text-xs font-medium whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {status === '전체' ? '📦 전체' : status === '대기중' ? '⏳ 대기' : status === '배송중' ? '🚛 배송중' : status === '완료' ? '✅ 완료' : '❌ 취소'}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">전체 주문</p>
                <p className="text-2xl font-bold text-slate-900">{orderList.length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-file-list-3-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">진행중</p>
                <p className="text-2xl font-bold text-slate-900">{orderList.filter(o => o.status === '배송중').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-truck-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">오늘 완료</p>
                <p className="text-2xl font-bold text-slate-900">{orderList.filter(o => o.status === '완료').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">배차 대기</p>
                <p className="text-2xl font-bold text-slate-900">{orderList.filter(o => o.status === '대기중').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-time-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Order Cards */}
        <div className="space-y-4">
          {filteredOrderList.map((order) => (
            <div key={order.id} className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-700">{order.orderNumber.slice(-3)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{order.customerName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDetailView(order)}
                      className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <i className="ri-eye-line text-slate-600 text-xs"></i>
                    </button>
                    <button 
                      onClick={() => handleEdit(order)}
                      className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <i className="ri-edit-line text-slate-600 text-xs"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(order)}
                      className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <i className="ri-delete-bin-line text-red-600 text-xs"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white rounded-2xl p-3 border border-slate-200">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <i className="ri-map-pin-line text-slate-400 text-sm w-4 mt-0.5"></i>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500">출발지</p>
                          <p className="text-sm text-slate-700 truncate">{order.pickupAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <i className="ri-map-pin-2-line text-slate-400 text-sm w-4 mt-0.5"></i>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500">도착지</p>
                          <p className="text-sm text-slate-700 truncate">{order.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">화물 정보</p>
                      <p className="text-sm text-slate-700">{order.cargoType}</p>
                      <p className="text-xs text-slate-500">{order.weight}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">예정 시간</p>
                      <p className="text-sm text-slate-700">{order.scheduledDate}</p>
                       <p className="text-xs text-slate-500">{order.scheduledTime}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">연락처</p>
                    <div className="flex items-center space-x-2">
                      <i className="ri-phone-line text-slate-400 text-sm"></i>
                      <span className="text-sm text-slate-700">{order.customerPhone}</span>
                      <button className="ml-auto w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <i className="ri-phone-line text-slate-600 text-xs"></i>
                      </button>
                    </div>
                  </div>

                  {order.driverName && (
                    <div className="bg-white rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-2">배차 정보</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-700 font-medium">{order.driverName}</p>
                           <p className="text-xs text-slate-500">{order.assignedVehicle}</p>
                        </div>
                        <div className="flex space-x-1">
                          <button className="w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                            <i className="ri-map-pin-line text-xs"></i>
                          </button>
                          <button className="w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                            <i className="ri-phone-line text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

        {/* Detail Modal */}
        {showDetailModal && editingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">주문 상세정보</h3>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
                >
                  <i className="ri-close-line text-slate-600"></i>
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">주문번호</label>
                  <p className="text-slate-900">{editingOrder.orderNumber}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">고객정보</label>
                  <p className="text-slate-900">{editingOrder.customerName}</p>
                  <p className="text-slate-600">{editingOrder.customerPhone}</p>
                  <p className="text-slate-600">{editingOrder.customerEmail}</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">픽업정보</label>
                  <p className="text-slate-900">{editingOrder.pickupAddress}</p>
                  <p className="text-slate-600">{editingOrder.pickupContact} ({editingOrder.pickupPhone})</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">배송정보</label>
                  <p className="text-slate-900">{editingOrder.deliveryAddress}</p>
                  <p className="text-slate-600">{editingOrder.deliveryContact} ({editingOrder.deliveryPhone})</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">화물정보</label>
                  <p className="text-slate-900">{editingOrder.cargoType} ({editingOrder.weight}kg)</p>
                  <p className="text-slate-600">가격: {editingOrder.price?.toLocaleString()}원</p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">일정</label>
                  <p className="text-slate-900">{editingOrder.scheduledDate} {editingOrder.scheduledTime}</p>
                </div>
                {editingOrder.driverName && (
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">배정정보</label>
                    <p className="text-slate-900">기사: {editingOrder.driverName}</p>
                    <p className="text-slate-600">차량: {editingOrder.assignedVehicle}</p>
                  </div>
                )}
                {editingOrder.notes && (
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">특이사항</label>
                    <p className="text-slate-900">{editingOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-4">주문 정보 수정</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">상태</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="대기중">대기중</option>
                    <option value="배송중">배송중</option>
                    <option value="완료">완료</option>
                    <option value="취소">취소</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">픽업주소</label>
                  <input
                    type="text"
                    value={editingOrder.pickupAddress}
                    onChange={(e) => setEditingOrder({...editingOrder, pickupAddress: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">배송주소</label>
                  <input
                    type="text"
                    value={editingOrder.deliveryAddress}
                    onChange={(e) => setEditingOrder({...editingOrder, deliveryAddress: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">기사명</label>
                  <input
                    type="text"
                    value={editingOrder.driverName || ''}
                    onChange={(e) => setEditingOrder({...editingOrder, driverName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">배정차량</label>
                  <input
                    type="text"
                    value={editingOrder.assignedVehicle || ''}
                    onChange={(e) => setEditingOrder({...editingOrder, assignedVehicle: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">특이사항</label>
                  <textarea
                    value={editingOrder.notes || ''}
                    onChange={(e) => setEditingOrder({...editingOrder, notes: e.target.value})}
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

        {/* Delete Modal */}
        {showDeleteModal && deletingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">주문 삭제</h3>
              <p className="text-sm text-slate-600 mb-6">
                <strong>{deletingOrder.orderNumber}</strong> 주문을 삭제하시겠습니까?<br/>
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

                  {!order.driverName && order.status === '대기중' && (
                    <button className="w-full bg-slate-900 text-white py-3 !rounded-button text-sm font-medium hover:bg-slate-800 transition-colors">
                      🚛 배차하기
                    </button>
                  )}

                  {order.notes && (
                    <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">특이사항</p>
                      <p className="text-sm text-slate-700">{order.notes}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 text-center">
                  등록: {order.createdDate}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrderList.length === 0 && (
          <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-200">
            <i className="ri-file-list-3-line text-4xl text-slate-300 mb-4 block"></i>
            <p className="text-slate-600 mb-2 text-sm">조건에 맞는 주문이 없어요 🤔</p>
            <p className="text-xs text-slate-500">검색어나 필터를 바꿔보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
