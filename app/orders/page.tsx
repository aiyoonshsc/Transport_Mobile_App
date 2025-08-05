
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Orders() {
  const [orders] = useState([
    {
      id: 'ORD001',
      from: '서울시 강남구 테헤란로 123',
      to: '부산시 해운대구 센텀중앙로 45',
      customerName: '(주)한국물류',
      customerPhone: '02-1234-5678',
      cargoType: '전자제품',
      weight: '2.5톤',
      scheduledDate: '2024-01-16',
      scheduledTime: '09:00',
      status: '배차대기',
      createdAt: '2024-01-15 14:30',
      notes: '깨지기 쉬운 물품, 조심히 운송 요망'
    },
    {
      id: 'ORD002',
      from: '인천시 남동구 구월로 234',
      to: '대구시 수성구 범어로 567',
      customerName: '대한상사',
      customerPhone: '032-2345-6789',
      cargoType: '기계부품',
      weight: '1.8톤',
      scheduledDate: '2024-01-15',
      scheduledTime: '13:30',
      status: '운송중',
      driver: '김철수',
      vehicle: '서울12가3456',
      createdAt: '2024-01-15 11:20'
    },
    {
      id: 'ORD003',
      from: '대전시 서구 둔산로 345',
      to: '광주시 북구 용봉로 678',
      customerName: '미래유통',
      customerPhone: '042-3456-7890',
      cargoType: '식품',
      weight: '3.2톤',
      scheduledDate: '2024-01-15',
      scheduledTime: '10:00',
      status: '완료',
      driver: '이민수',
      vehicle: '인천56다1234',
      createdAt: '2024-01-15 08:45'
    },
    {
      id: 'ORD004',
      from: '울산시 중구 성남동 123',
      to: '천안시 서북구 두정동 456',
      customerName: '태평물산',
      customerPhone: '052-4567-8901',
      cargoType: '화학용품',
      weight: '4.1톤',
      scheduledDate: '2024-01-16',
      scheduledTime: '14:00',
      status: '배차대기',
      createdAt: '2024-01-15 16:10'
    },
    {
      id: 'ORD005',
      from: '제주시 일도1동 789',
      to: '서귀포시 대정읍 101',
      customerName: '제주특산품',
      customerPhone: '064-5678-9012',
      cargoType: '농산물',
      weight: '1.2톤',
      scheduledDate: '2024-01-15',
      scheduledTime: '11:30',
      status: '완료',
      driver: '박영희',
      vehicle: '제주34나7890',
      createdAt: '2024-01-15 07:45'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case '배차대기':
        return 'bg-slate-100 text-slate-700';
      case '운송중':
        return 'bg-slate-200 text-slate-600';
      case '완료':
        return 'bg-slate-300 text-slate-500';
      case '취소':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '전체' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
            {['전체', '배차대기', '운송중', '완료', '취소'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 !rounded-button text-xs font-medium whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {status === '전체' ? '📦 전체' : status === '배차대기' ? '⏳ 대기' : status === '운송중' ? '🚛 운송중' : status === '완료' ? '✅ 완료' : '❌ 취소'}
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
                <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
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
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === '운송중').length}</p>
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
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === '완료').length}</p>
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
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === '배차대기').length}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-time-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Order Cards */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-700">{order.id.slice(-3)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{order.customerName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors">
                    <i className="ri-more-line text-slate-600"></i>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="bg-white rounded-2xl p-3 border border-slate-200">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <i className="ri-map-pin-line text-slate-400 text-sm w-4 mt-0.5"></i>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500">출발지</p>
                          <p className="text-sm text-slate-700 truncate">{order.from}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <i className="ri-map-pin-2-line text-slate-400 text-sm w-4 mt-0.5"></i>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500">도착지</p>
                          <p className="text-sm text-slate-700 truncate">{order.to}</p>
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

                  {order.driver && (
                    <div className="bg-white rounded-2xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-2">배차 정보</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-700 font-medium">{order.driver}</p>
                          <p className="text-xs text-slate-500">{order.vehicle}</p>
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

                  {!order.driver && order.status === '배차대기' && (
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
                  등록: {order.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
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
