'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PAYMENT_PLANS } from '@/lib/data';
import { PaymentPlan } from '@/lib/types';
import { authMock } from '@/lib/auth-mock';

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 로그인 확인
    if (!authMock.isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    // 차량 데이터 확인
    const carData = localStorage.getItem('pendingCarData');
    if (!carData) {
      router.push('/sell');
      return;
    }
  }, [router]);

  const handlePlanSelect = (plan: PaymentPlan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !paymentMethod) {
      alert('플랜과 결제수단을 선택해주세요.');
      return;
    }

    setIsProcessing(true);

    // 결제 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 차량 데이터에 플랜 정보 추가
    const carData = JSON.parse(localStorage.getItem('pendingCarData') || '{}');
    const updatedCarData = {
      ...carData,
      listingType: selectedPlan.name,
      paymentPlan: selectedPlan,
      paymentMethod,
      paidAt: new Date()
    };

    // 내 공고에 추가
    const myListings = JSON.parse(localStorage.getItem('myListings') || '[]');
    myListings.push(updatedCarData);
    localStorage.setItem('myListings', JSON.stringify(myListings));

    // 임시 데이터 삭제
    localStorage.removeItem('pendingCarData');

    setIsProcessing(false);
    alert('차량이 성공적으로 등록되었습니다!');
    router.push('/mypage/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">결제</h1>
          <p className="text-lg text-gray-600">
            노출 플랜을 선택하고 결제하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Plans */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">노출 플랜 선택</h2>
            <div className="space-y-4">
              {PAYMENT_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`card cursor-pointer transition-all duration-200 ${
                    selectedPlan?.id === plan.id
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : 'hover:shadow-soft-lg'
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        {plan.price === 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            무료
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-primary-600 mb-3">
                        {plan.price === 0 ? '무료' : `${plan.price.toLocaleString()}₮`}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {plan.duration}일간 노출
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ml-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan?.id === plan.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPlan?.id === plan.id && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">결제수단</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">신용카드</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="qpay"
                    checked={paymentMethod === 'qpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">QPay</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 요약</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">플랜</span>
                  <span className="font-medium">
                    {selectedPlan ? selectedPlan.name : '선택 안함'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">노출 기간</span>
                  <span className="font-medium">
                    {selectedPlan ? `${selectedPlan.duration}일` : '-'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">결제수단</span>
                  <span className="font-medium">
                    {paymentMethod === 'card' ? '신용카드' : paymentMethod === 'qpay' ? 'QPay' : '선택 안함'}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>총 금액</span>
                    <span className="text-primary-600">
                      {selectedPlan ? (selectedPlan.price === 0 ? '무료' : `${selectedPlan.price.toLocaleString()}₮`) : '0₮'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={!selectedPlan || !paymentMethod || isProcessing}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? '처리 중...' : '결제하기'}
            </button>

            {/* Terms */}
            <div className="text-xs text-gray-500 text-center">
              <p>
                결제 시{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-700">
                  이용약관
                </a>
                에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
