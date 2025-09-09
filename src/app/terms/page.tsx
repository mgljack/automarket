export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
            <p className="text-gray-700 mb-6">
              본 약관은 AutoMarket.mn(이하 "회사")이 제공하는 중고차 거래 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. "서비스"란 회사가 제공하는 중고차 거래 플랫폼을 의미합니다.</p>
              <p>2. "이용자"란 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 의미합니다.</p>
              <p>3. "회원"이란 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</p>
              <p>2. 회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.</p>
              <p>3. 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단할 수 있습니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회사는 다음과 같은 서비스를 제공합니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>중고차 정보 제공 및 검색 서비스</li>
                <li>중고차 거래 중개 서비스</li>
                <li>회원 간 정보 교류 서비스</li>
                <li>기타 회사가 정하는 서비스</li>
              </ul>
              <p>2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제5조 (회원가입)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회원가입은 이용자가 약관의 내용에 대하여 동의를 하고 회원가입신청을 한 후 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.</p>
              <p>2. 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제6조 (개인정보보호)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.</p>
              <p>2. 회사는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다.</p>
              <p>3. 회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제7조 (회사의 의무)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는데 최선을 다하여야 합니다.</p>
              <p>2. 회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 구축하여야 합니다.</p>
              <p>3. 회사는 이용자의 개인정보를 본인의 승낙없이 타인에게 누설, 공개 또는 배포할 수 없으며, 서비스관련 된 업무 이외에 상용하지 않습니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제8조 (이용자의 의무)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>신청 또는 변경시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제9조 (서비스 이용의 제한)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회사는 이용자가 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.</p>
              <p>2. 회사는 전항에도 불구하고, 주민등록법을 위반한 명의도용 및 결제도용, 전화번호 도용, 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제10조 (손해배상)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 중대한 과실에 의한 경우를 제외하고는 이에 대하여 책임을 부담하지 아니합니다.</p>
              <p>2. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제11조 (면책조항)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
              <p>2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
              <p>3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제12조 (준거법 및 관할법원)</h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p>1. 서비스 이용과 관련하여 회사와 이용자 사이에 분쟁이 발생한 경우, 몽골 법률에 따라 해결합니다.</p>
              <p>2. 서비스 이용으로 발생한 분쟁에 대해 소를 제기하는 경우 몽골 울란바토르시 법원을 관할법원으로 합니다.</p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong>부칙</strong><br />
                본 약관은 2024년 1월 1일부터 시행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
