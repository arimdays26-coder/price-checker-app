import React, { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      setIsLoading(true);
      setTimeout(() => {
        const mockResults = [
          { 
            productName: 'Kirkland Signature 테킬라 아네호 750ml',
            status: '적합', 
            badgeColor: 'bg-green-500', 
            amazonMin: '$450 MXN', 
            amazonMax: '$620 MXN', 
            marginRate: '28% (목표치 달성)',
            reason: '현재 창고형 매장 판매가 대비 멕시코 아마존 최저가가 높아 충분한 마진 확보가 가능합니다.' 
          },
          { 
            productName: 'Member’s Mark 유기농 올리브유 1L',
            status: '부적합', 
            badgeColor: 'bg-red-500', 
            amazonMin: '$310 MXN', 
            amazonMax: '$380 MXN', 
            marginRate: '5% (마진 부족)',
            reason: '멕시코 아마존 내 경쟁 과다로 인해 최저가가 낮게 형성되어 있어 손실 위험이 큽니다.' 
          },
          { 
            productName: 'Kirkland Signature 프로틴 바 세트 (20개입)',
            status: '보류', 
            badgeColor: 'bg-yellow-500', 
            amazonMin: '$400 MXN', 
            amazonMax: '$510 MXN', 
            marginRate: '15% (검토 필요)',
            reason: '멕시코 아마존 최저/최고가 격차가 큽니다. 배송비 및 수수료를 감안한 세부 재계산이 필요합니다.' 
          }
        ];
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        setAnalysisResult(randomResult);
        setIsLoading(false);
        setIsExpanded(false);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-min min-h-screen bg-gray-100 p-3 font-sans max-w-md mx-auto">
      {/* 상단 타이틀 */}
      <header className="w-full mb-2 text-center">
        <h1 className="text-lg font-bold text-gray-900">멕시코 소싱 & 아마존 가격 비교</h1>
      </header>

      {/* 카메라 촬영 영역 (사진 크기를 1/4 수준으로 대폭 축소) */}
      <div className="w-full bg-white rounded-xl shadow-sm p-2.5 flex items-center justify-between border border-gray-200">
        <div className="flex items-center space-x-3">
          {!image ? (
            <div className="w-16 h-16 bg-blue-50 border border-blue-300 rounded-lg flex items-center justify-center text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <img src={image} alt="촬영된 가격표" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <span className="text-xs font-bold text-gray-800 block">가격표 스캔 모드</span>
            <span className="text-[10px] text-gray-500">버튼을 눌러 즉시 촬영하세요</span>
          </div>
        </div>

        <label className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition shadow-sm">
          {image ? '다시 촬영' : '촬영하기'}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            onChange={handleImageCapture} 
          />
        </label>
      </div>

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="w-full mt-3 text-center py-4 bg-white rounded-xl shadow-sm">
          <p className="text-xs text-blue-600 font-bold animate-pulse">바코드 인식 및 멕시코 아마존 상품 매칭 중...</p>
        </div>
      )}

      {/* 분석 결과 및 아마존 가격 정보 카드 */}
      {analysisResult && !isLoading && (
        <div className="w-full mt-3 bg-white rounded-2xl shadow-md p-4 border border-gray-200 space-y-3">
          
          {/* 1. 제품명을 메인 타이틀 창으로 배치 */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">인식된 상품명</span>
            <h2 className="text-sm font-extrabold text-gray-900">{analysisResult.productName}</h2>
          </div>

          {/* 2. 종합 판정 (적합/부적합/보류) 뱃지 */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-gray-700 font-bold">판정 결과</span>
            <span className={`px-4 py-1 text-white text-xs font-extrabold rounded-full shadow-xs ${analysisResult.badgeColor}`}>
              {analysisResult.status}
            </span>
          </div>

          {/* 3. 멕시코 아마존 시세 정보 */}
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-orange-900">
                🛒 멕시코 아마존(Amazon MX) 시세
              </span>
              <span className="text-xs text-gray-800 font-extrabold">마진: {analysisResult.marginRate}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-lg shadow-xs border border-orange-200">
                <span className="block text-[11px] text-gray-500 font-semibold">아마존 최저가</span>
                <span className="text-sm font-black text-gray-900">{analysisResult.amazonMin}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg shadow-xs border border-orange-200">
                <span className="block text-[11px] text-gray-500 font-semibold">아마존 최고가</span>
                <span className="text-sm font-black text-gray-900">{analysisResult.amazonMax}</span>
              </div>
            </div>
          </div>

          {/* 4. 상세 사유 토글 영역 */}
          <div className="pt-1 border-t border-gray-100">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex justify-between items-center text-xs font-bold text-gray-700 focus:outline-none py-2"
            >
              <span>상세 판정 이유 및 분석 보기</span>
              <svg 
                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isExpanded && (
              <div className="mt-1 p-3 bg-gray-50 rounded-lg text-xs text-gray-700 leading-relaxed border border-gray-200">
                <p><strong>사유:</strong> {analysisResult.reason}</p>
                <p className="mt-1 text-gray-500">* 창고형 매장 바코드 기반 실시간 멕시코 아마존 매칭 결과입니다.</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}