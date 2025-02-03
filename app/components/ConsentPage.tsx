'use client';

import { useState } from 'react';

interface ConsentPageProps {
  onNext: () => void;
}

export function ConsentPage({ onNext }: ConsentPageProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    onNext();
  };

  return (
    <div className="title-page">
      <div className="decorative-shape shape1"></div>
      <div className="decorative-shape shape2"></div>
      <div className="title-content">
        <h2 className="text-3xl mb-10 text-gray-800 font-bold text-shadow animate-fadeIn">
          개인정보 수집 및 이용 동의
        </h2>
        <div className="max-w-3xl mx-auto p-10 bg-white rounded-xl shadow-lg transition-transform hover:scale-[1.01] animate-slideUp">
          <div className="bg-gray-50 p-5 rounded-lg mb-8">
            <h3 className="text-blue-600 mb-4 text-xl font-bold">1. 수집하는 개인정보 항목</h3>
            <ul className="list-none pl-5">
              <li className="mb-2">• 회사명</li>
              <li className="mb-2">• 부서명</li>
              <li className="mb-2">• 직급명</li>
              <li className="mb-2">• 이름</li>
              <li className="mb-2">• 나이</li>
              <li className="mb-2">• 연락처</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg mb-8">
            <h3 className="text-blue-600 mb-4 text-xl font-bold">2. 개인정보의 수집 및 이용목적</h3>
            <ul className="list-none pl-5">
              <li className="mb-2">• 시험 응시자 신원 확인</li>
              <li className="mb-2">• 시험 결과 통보 및 관리</li>
              <li className="mb-2">• 자격증 발급 및 관리</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg mb-8">
            <h3 className="text-blue-600 mb-4 text-xl font-bold">3. 개인정보의 보유 및 이용기간</h3>
            <p className="pl-5">• 수집일로부터 5년</p>
          </div>

          <div className="text-center mt-10 p-5 bg-gray-50 rounded-lg">
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-lg text-gray-800">
                위 개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold
                     transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5
                     hover:shadow-lg"
          >
            다음 단계로
          </button>
        </div>
      </div>
    </div>
  );
} 