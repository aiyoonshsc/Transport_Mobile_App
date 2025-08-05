
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [stats] = useState({
    totalVehicles: 24,
    activeOrders: 18,
    completedToday: 12,
    pendingDispatch: 6
  });

  const [recentOrders] = useState([
    { id: 1, from: '서울 강남구', to: '부산 해운대구', driver: '김철수', status: '운송중', time: '14:30' },
    { id: 2, from: '인천 남동구', to: '대구 수성구', driver: '박영희', status: '배차대기', time: '13:45' },
    { id: 3, from: '대전 서구', to: '광주 북구', driver: '이민수', status: '완료', time: '12:20' },
    { id: 4, from: '울산 중구', to: '천안 동남구', driver: '정수진', status: '운송중', time: '11:15' },
    { id: 5, from: '제주 일도동', to: '서귀포 대정읍', driver: '홍길동', status: '완료', time: '10:30' }
  ]);

  const [activeVehicles] = useState([
    { id: 1, number: '서울12가3456', driver: '김철수', location: '경부고속도로 대전IC', status: '운행중' },
    { id: 2, number: '부산34나7890', driver: '박영희', location: '회사 차고지', status: '대기중' },
    { id: 3, number: '인천56다1234', driver: '이민수', location: '광주광역시 북구', status: '하역중' },
    { id: 4, number: '대구78라5678', driver: '정수진', location: '중부고속도로 음성IC', status: '운행중' },
    { id: 5, number: '제주90마1234', driver: '홍길동', location: '서귀포항 부두', status: '대기중' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '운송중':
      case '운행중':
        return 'bg-slate-200 text-slate-600';
      case '배차대기':
      case '대기중':
        return 'bg-slate-100 text-slate-700';
      case '완료':
        return 'bg-slate-300 text-slate-500';
      case '하역중':
        return 'bg-slate-200 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-sm mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 mb-1">대시보드 ✨</h1>
          <p className="text-xs text-slate-500">실시간 운송 현황을 확인해보세요</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">전체 차량</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalVehicles}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-truck-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">진행중 주문</p>
                <p className="text-2xl font-bold text-slate-900">{stats.activeOrders}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-file-list-3-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 mb-1">오늘 완료</p>
                <p className="text-2xl font-bold text-slate-900">{stats.completedToday}</p>
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
                <p className="text-2xl font-bold text-slate-900">{stats.pendingDispatch}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl flex items-center justify-center">
                <i className="ri-time-line text-slate-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-slate-50 rounded-3xl border border-slate-100 mb-6">
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">최근 주문 📦</h2>
              <Link href="/orders" className="text-slate-600 text-xs hover:text-slate-800">
                전체보기
              </Link>
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {recentOrders.slice(0, 4).map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-900">{order.from}</span>
                      <i className="ri-arrow-right-line text-slate-400 text-xs"></i>
                      <span className="text-sm font-medium text-slate-900">{order.to}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{order.driver}</span>
                    <span>{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Vehicles Section */}
        <div className="bg-slate-50 rounded-3xl border border-slate-100 mb-6">
          <div className="p-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">실시간 차량 위치 🚛</h2>
          </div>
          <div className="p-5">
            <div className="bg-slate-200 rounded-2xl h-32 flex items-center justify-center mb-4">
              <div className="text-center">
                <i className="ri-map-2-line text-2xl text-slate-400 mb-2 block"></i>
                <p className="text-xs text-slate-500">지도 연동 예정</p>
                <p className="text-xs text-slate-400">실시간 위치 추적</p>
              </div>
            </div>
            <div className="space-y-3">
              {activeVehicles.slice(0, 3).map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-2xl p-3 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-900 text-sm">{vehicle.number}</span>
                      <p className="text-xs text-slate-500 mt-1">{vehicle.driver} • {vehicle.location}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-50 rounded-3xl border border-slate-100">
          <div className="p-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">빠른 작업 ⚡</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/orders/new" className="bg-white rounded-2xl p-4 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="text-center">
                  <i className="ri-add-circle-line text-2xl text-slate-600 mb-2 block"></i>
                  <span className="text-sm font-medium text-slate-700">새 주문</span>
                </div>
              </Link>
              
              <Link href="/dispatch" className="bg-white rounded-2xl p-4 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="text-center">
                  <i className="ri-send-plane-line text-2xl text-slate-600 mb-2 block"></i>
                  <span className="text-sm font-medium text-slate-700">배차관리</span>
                </div>
              </Link>
              
              <Link href="/vehicles" className="bg-white rounded-2xl p-4 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="text-center">
                  <i className="ri-truck-line text-2xl text-slate-600 mb-2 block"></i>
                  <span className="text-sm font-medium text-slate-700">차량관리</span>
                </div>
              </Link>
              
              <Link href="/jiip" className="bg-white rounded-2xl p-4 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="text-center">
                  <i className="ri-building-line text-2xl text-slate-600 mb-2 block"></i>
                  <span className="text-sm font-medium text-slate-700">지입관리</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
