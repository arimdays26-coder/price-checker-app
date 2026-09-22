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
            status: '적합', 
            badgeColor: 'bg-green-500', 
            amazonMin: '$450 MXN', 
            amazonMax: '$620 MXN', 
            marginRate: '28% (목표치 달성)',
            reason: '현재 창고형 매장 판매가 대비 멕시코 아마존 최저가가 높아 충분한 마진 확보가 가능합니다.' 
          },
          { 
            status: '부적합', 
            badgeColor: 'bg-red-500', 
            amazonMin: '$310 MXN', 
            amazonMax: '$380 MXN', 
            marginRate: '5% (마진 부족)',
            reason: '멕시코 아마존 내 경쟁 과다로 인해 최저가가 낮게 형성되어 있어 손실 위험이 큽니다.' 
          },
          { 
            status: '보류', 
            badgeColor: 'bg-yellow-500', 
            amazonMin: '$400 MXN', 
            amazonMax: '$510 MXN', 
            marginRate: '15% (검토 필요)',
            reason: '아마존 최저/최고가 격차가 큽니다. 배송비 및 수수료를 감안한 세부 재계산이 필요합니다.' 
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
    <div className="flex flex-col items-center justify-min min-h-screen bg-gray-100 p-4 font-sans max-w-md mx-auto">
      {/* 상단 타이틀 */}
      <header className="w-full mb-4 text-center">
        <h1 className="text-xl font-bold text-gray-800">멕시코 소싱 & 아마존 가격 비교</h1>
        <p className="text-xs text-gray-500">가격표를 촬영하면 아마존 시세와 즉시 비교합니다.</p>
      </header>

      {/* 카메라 바로가기 영역 (아이콘 크기 및 패딩 최적화) */}
      <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-gray-200">
        {!image ? (
          <label className="w-full h-40 border-2 border-dashed border-blue-400 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
            {/* 아이콘 크기를 w-8 h-8로 축소하여 과도하게 큰 현상 수정 */}
            <svg className="w-8 h-8 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-semibold text-blue-600">가격표 촬영하기</span>
            <span className="text-[10px] text-gray-400 mt-0.5">(카메라가 즉시 실행됩니다)</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handleImageCapture} 
            />
          </label>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* 촬영된 이미지 확대 문제 해결을 위한 object-contain 및 높이 조정 */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner bg-gray-900 flex items-center justify-center">
              <img src={image} alt="촬영된 가격표" className="max-h-full max-w-full object-contain" />
            </div>
            <label className="mt-3 w-full py-2 bg-gray-800 text-white text-center text-xs font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition">
              다시 촬영하기
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                className="hidden" 
                onChange={handleImageCapture} 
              />
            </label>
          </div>
        )}
      </div>

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="w-full mt-4 text-center py-5 bg-white rounded-xl shadow-sm">
          <p className="text-xs text-blue-600 font-medium animate-pulse">바코드 인식 및 멕시코 아마존 시세 조회 중...</p>
        </div>
      )}

      {/* 분석 결과 및 아마존 가격 정보 카드 */}
      {analysisResult && !isLoading && (
        <div className="w-full mt-4 bg-white rounded-2xl shadow-md p-4 border border-gray-200 space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">종합 판정</span>
            <span className={`px-2.5 py-0.5 text-white text-xs font-bold rounded-full ${analysisResult.badgeColor}`}>
              {analysisResult.status}
            </span>
          </div>

          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-orange-800">
                🛒 멕시코 아마존(Amazon MX) 시세
              </span>
              <span className="text-[11px] text-gray-600 font-medium">마진: {analysisResult.marginRate}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white p-2 rounded-lg shadow-xs border border-orange-200">
                <span className="block text-[10px] text-gray-400">아마존 최저가</span>
                <span className="text-xs font-bold text-gray-800">{analysisResult.amazonMin}</span>
              </div>
              <div className="bg-white p-2 rounded-lg shadow-xs border border-orange-200">
                <span className="block text-[10px] text-gray-400">아마존 최고가</span>
                <span className="text-xs font-bold text-gray-800">{analysisResult.amazonMax}</span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex justify-between items-center text-xs font-semibold text-gray-600 focus:outline-none py-1"
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
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 leading-relaxed border border-gray-100">
                <p><strong>사유:</strong> {analysisResult.reason}</p>
                <p className="mt-1 text-gray-400">* 창고형 매장 바코드 기반 실시간 멕시코 아마존 매칭 결과입니다.</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}