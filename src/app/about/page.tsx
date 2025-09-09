export default function AboutPage() {
  const team = [
    {
      name: 'Batbold',
      position: 'CEO',
      description: '10년간 IT 업계에서 경험을 쌓아온 전문가입니다.',
      image: '/team/batbold.jpg'
    },
    {
      name: 'Sukhbat',
      position: 'CTO',
      description: '풀스택 개발자로서 안정적인 서비스를 제공합니다.',
      image: '/team/sukhbat.jpg'
    },
    {
      name: 'Enkhjin',
      position: '디자인 리더',
      description: '사용자 중심의 직관적인 디자인을 추구합니다.',
      image: '/team/enkhjin.jpg'
    }
  ];

  const stats = [
    { label: '등록된 차량', value: '1,200+', icon: '🚗' },
    { label: '활성 사용자', value: '5,000+', icon: '👥' },
    { label: '성공한 거래', value: '800+', icon: '🤝' },
    { label: '서비스 만족도', value: '98%', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">AutoMarket.mn 소개</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              몽골 최대 중고차 거래 플랫폼으로, 안전하고 신뢰할 수 있는 중고차 거래를 제공합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">우리의 미션</h2>
              <p className="text-lg text-gray-700 mb-6">
                AutoMarket.mn은 몽골의 중고차 거래를 혁신하고 있습니다. 
                기술과 신뢰를 바탕으로 구매자와 판매자 모두에게 안전하고 편리한 거래 환경을 제공합니다.
              </p>
              <p className="text-lg text-gray-700">
                우리는 모든 차량이 수입차인 몽골의 특수한 상황을 이해하고, 
                이에 맞는 최적화된 서비스를 제공합니다.
              </p>
            </div>
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">핵심 가치</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>투명성과 신뢰</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>사용자 중심 설계</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>지속적인 혁신</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>고객 만족</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">우리의 성과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">우리 팀</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-semibold text-2xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">스마트 검색</h3>
              <p className="text-gray-600">다양한 필터를 통해 원하는 차량을 쉽게 찾을 수 있습니다.</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">안전한 거래</h3>
              <p className="text-gray-600">모든 차량은 검증된 정보로 안전한 거래를 보장합니다.</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">다양한 결제</h3>
              <p className="text-gray-600">신용카드, QPay 등 다양한 결제 수단을 지원합니다.</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">좋아요 기능</h3>
              <p className="text-gray-600">관심 있는 차량을 저장하고 나중에 쉽게 확인할 수 있습니다.</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">직접 연락</h3>
              <p className="text-gray-600">판매자와 직접 연락하여 상세한 정보를 확인할 수 있습니다.</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">빠른 등록</h3>
              <p className="text-gray-600">몇 분만에 차량을 등록하고 판매를 시작할 수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-xl text-primary-100 mb-8">
            AutoMarket.mn과 함께 안전하고 편리한 중고차 거래를 경험해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/buy" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8">
              차량 구매하기
            </a>
            <a href="/sell" className="btn-accent bg-accent-600 hover:bg-accent-700 text-white px-8">
              차량 판매하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
