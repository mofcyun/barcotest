'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Questions } from './components/Questions';
import { ConsentPage } from './components/ConsentPage';
import { InfoPage } from './components/InfoPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 제출 상태 확인
    const submitted = localStorage.getItem('testSubmitted') === 'true';
    setIsSubmitted(submitted);
  }, []);

  const showPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const confirmSubmit = () => {
    localStorage.setItem('testSubmitted', 'true');
    localStorage.setItem('submitTime', new Date().toISOString());
    setIsSubmitted(true);
    setShowModal(false);
    setCurrentPage(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* 타이틀 페이지 */}
        {currentPage === 0 && (
          <div className="title-page text-center">
            <div className="max-w-4xl mx-auto">
              <Image
                src="/logo.png"
                alt="베이직테크 로고"
                width={600}
                height={200}
                className="mx-auto mb-10"
                priority
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                베이직테크<br />
                Barco E2 Level 1<br />
                TEST
              </h1>
              <button
                onClick={() => showPage(1)}
                disabled={isSubmitted}
                className={`px-8 py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition-colors
                  ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                시작하기
              </button>
            </div>
          </div>
        )}

        {/* 개인정보 동의 페이지 */}
        {currentPage === 1 && (
          <ConsentPage onNext={() => showPage(2)} />
        )}

        {/* 인적사항 입력 페이지 */}
        {currentPage === 2 && (
          <InfoPage onNext={() => showPage(3)} />
        )}

        {/* 문제 페이지들 */}
        {currentPage >= 3 && (
          <Questions
            currentPage={currentPage - 3}
            isSubmitted={isSubmitted}
            onPageChange={(page) => showPage(page + 3)}
            onSubmit={handleSubmit}
          />
        )}

        {/* 제출 확인 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-center">⚠️ 경고</h2>
              <p className="text-lg mb-8 text-center">
                지금 제출하시면 시험이 종료됩니다.<br />
                정말 제출하시겠습니까?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmSubmit}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
