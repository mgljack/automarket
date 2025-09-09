'use client';

import { useState } from 'react';
import { Seller } from '@/types/car';

interface SellerContactProps {
  seller: Seller;
  children: React.ReactNode;
}

export default function SellerContact({ seller, children }: SellerContactProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyPhone = () => {
    if (seller.phone) {
      navigator.clipboard.writeText(seller.phone);
      alert('전화번호가 복사되었습니다.');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary"
      >
        {children}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-soft-lg transform transition-all">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">판매자 연락처</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-semibold text-xl">
                      {seller.name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{seller.name}</h4>
                  {seller.company && (
                    <p className="text-gray-600">{seller.company}</p>
                  )}
                  {seller.location && (
                    <p className="text-sm text-gray-500">{seller.location}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">전화번호</div>
                      <div className="font-medium text-lg">{seller.phone}</div>
                    </div>
                    <button
                      onClick={handleCopyPhone}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="전화번호 복사"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={`tel:${seller.phone}`}
                    className="flex-1 btn-primary text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    지금 전화하기
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 btn-secondary"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
