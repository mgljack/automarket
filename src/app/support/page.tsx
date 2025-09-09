export default function SupportPage() {
  const faqs = [
    {
      question: '차량을 등록하려면 어떻게 해야 하나요?',
      answer: '차팔기 메뉴에서 차량 정보를 입력하고 이미지를 업로드한 후, 원하는 노출 플랜을 선택하여 결제하시면 됩니다.'
    },
    {
      question: '결제는 어떤 방법으로 할 수 있나요?',
      answer: '신용카드와 QPay를 통해 결제하실 수 있습니다. 무료 플랜도 제공됩니다.'
    },
    {
      question: '차량 정보를 수정할 수 있나요?',
      answer: '차량 등록 후에는 정보 수정이 제한됩니다. 정확한 정보를 입력해주시기 바랍니다.'
    },
    {
      question: '판매자와 직접 연락할 수 있나요?',
      answer: '차량 상세 페이지에서 판매자 연락처를 확인하고 직접 연락하실 수 있습니다.'
    },
    {
      question: '계정을 삭제하려면 어떻게 해야 하나요?',
      answer: '마이페이지 > 프로필에서 계정 삭제 버튼을 클릭하시면 됩니다. 삭제된 계정은 복구할 수 없습니다.'
    },
    {
      question: '서비스 이용료가 있나요?',
      answer: '기본 서비스는 무료이며, 프리미엄 노출을 원하시는 경우에만 추가 비용이 발생합니다.'
    }
  ];

  const contactMethods = [
    {
      title: '전화 문의',
      description: '평일 09:00-18:00',
      contact: '+976-11-123456',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: '이메일 문의',
      description: '24시간 접수 가능',
      contact: 'support@automarket.mn',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '카카오톡 문의',
      description: '평일 09:00-18:00',
      contact: '@AutoMarketMN',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11L8.5 21.5c-1.5-1.5-3-3-3-5.5 0-4.521 4.701-8.185 10.5-8.185z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">고객센터</h1>
          <p className="text-lg text-gray-600">궁금한 점이 있으시면 언제든 문의해주세요</p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="card text-center hover:shadow-soft-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <p className="font-medium text-primary-600">{method.contact}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {faq.question}
                    </h3>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">문의하기</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 유형
              </label>
              <select className="input">
                <option value="">문의 유형을 선택하세요</option>
                <option value="account">계정 관련</option>
                <option value="payment">결제 관련</option>
                <option value="car">차량 관련</option>
                <option value="technical">기술적 문제</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                className="input"
                placeholder="문의 제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                className="input w-full h-32 resize-none"
                placeholder="문의 내용을 자세히 입력하세요"
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn-primary px-8 py-3">
                문의하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
