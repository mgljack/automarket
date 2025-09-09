export default function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: '2024년 1월 서비스 점검 안내',
      content: '더 나은 서비스 제공을 위해 2024년 1월 15일 오전 2시부터 4시까지 서비스 점검을 실시합니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다.',
      date: '2024-01-10',
      category: '시스템',
      isImportant: true
    },
    {
      id: 2,
      title: '새로운 결제 수단 추가',
      content: 'QPay 결제 서비스가 추가되었습니다. 이제 더욱 편리하게 결제하실 수 있습니다.',
      date: '2024-01-08',
      category: '서비스',
      isImportant: false
    },
    {
      id: 3,
      title: '차량 등록 시 주의사항',
      content: '차량 등록 시 정확한 정보를 입력해주시기 바랍니다. 허위 정보로 인한 문제 발생 시 책임을 지지 않습니다.',
      date: '2024-01-05',
      category: '안내',
      isImportant: false
    },
    {
      id: 4,
      title: '개인정보 처리방침 개정',
      content: '개인정보 보호를 위한 처리방침이 개정되었습니다. 자세한 내용은 개인정보 처리방침을 확인해주세요.',
      date: '2024-01-03',
      category: '정책',
      isImportant: true
    },
    {
      id: 5,
      title: '고객센터 운영시간 변경',
      content: '고객센터 운영시간이 평일 09:00-18:00으로 변경되었습니다. 주말 및 공휴일은 휴무입니다.',
      date: '2024-01-01',
      category: '고객지원',
      isImportant: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '시스템':
        return 'bg-red-100 text-red-800';
      case '서비스':
        return 'bg-blue-100 text-blue-800';
      case '안내':
        return 'bg-green-100 text-green-800';
      case '정책':
        return 'bg-purple-100 text-purple-800';
      case '고객지원':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">공지사항</h1>
          <p className="text-lg text-gray-600">AutoMarket.mn의 최신 소식을 확인하세요</p>
        </div>

        <div className="space-y-6">
          {notices.map((notice) => (
            <div key={notice.id} className="card hover:shadow-soft-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${notice.isImportant ? 'text-red-600' : 'text-gray-900'}`}>
                      {notice.title}
                    </h3>
                    {notice.isImportant && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        중요
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{notice.date}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(notice.category)}`}>
                      {notice.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {notice.content}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              이전
            </button>
            <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
              2
            </button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
              3
            </button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
              다음
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
