import React, { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 카메라로 촬영한 이미지를 서버(AI/OCR)로 전송하여 정확한 상품을 찾는 함수
  const handleImageCapture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      setIsLoading(true);

      // 실제 구현 시: 백엔드 서버로 이미지 전송 (FormData 활용)
      /*
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await fetch('https://내-백엔드-서버주소/api/analyze', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setAnalysisResult(data);
      } catch (error) {
        console.error('서버 통신 오류:', error);
      } finally {
        setIsLoading(false);
      }
      */

      // 현재 시뮬레이션 (추후 백엔드 AI 분석 결과로 대체될 영역)
      setTimeout(() => {
        const mockResult = { 
          productName: '실제 촬영된 바코드/가격표 기반 매칭 상품 (예: Kirkland Signature 테킬라)',
          status: '적합', 
          badgeColor: 'bg-green-500', 
          amazonMin: '$450 MXN', 
          amazonMax: '$620 MXN', 
          marginRate: '28% (목표치 달성)',
          reason: '가격표 이미지 내 바코드 인식을 통해 멕시코 아마존 실제 데이터를 정확히 대조한 결과입니다.' 
        };
        setAnalysisResult(mockResult);
        setIsLoading(false);
        setIsExpanded(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-min min-h-screen bg-gray-100 p-3 font-sans max-w-md mx-auto">
      {/* 상단 타이틀 */}
      <header className="w-full mb-2 text-center">
        <h1 className="text-lg font-bold text-gray-900">멕시코 소싱 & 아마존 가격 비교</h1>
      </header>

      {/* 카메라 촬영 영역 (1/10 썸네일) */}
      <div className="w-full bg-white rounded-xl shadow-sm p-2.5 flex items-center justify-between border border-gray-200">
        <div className="flex items-center space-x-2.5">
          {!image ? (
            <div className="w-8 h-8 bg-blue-50 border border-blue-300 rounded flex items-center justify-center text-blue-500 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 bg-black rounded overflow-hidden flex items-center justify-center flex-shrink-0">
              <img src={image} alt="촬영된 가격표" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <span className="text-xs font-bold text-gray-800 block">가격표 스캔 모드</span>
            <span className="text-[10px] text-gray-500">정밀 AI 분석 연동 준비됨</span>
          </div>
        </div>

        <label className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition shadow-sm">
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
          <p className="text-xs text-blue-600 font-bold animate-pulse">이미지 AI 판독 및 멕시코 아마존 실시간 서칭 중...</p>
        </div>
      )}

      {/* 분석 결과 및 아마존 가격 정보 카드 */}
      {analysisResult && !isLoading && (
        <div className="w-full mt-3 bg-white rounded-2xl shadow-md p-4 border border-gray-200 space-y-3">
          
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">인식된 상품명</span>
            <h2 className="text-sm font-extrabold text-gray-900">{analysisResult.productName}</h2>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-gray-700 font-bold">판정 결과</span>
            <span className={`px-4 py-1 text-white text-xs font-extrabold rounded-full shadow-xs ${analysisResult.badgeColor}`}>
              {analysisResult.status}
            </span>
          </div>

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