import React, { useEffect } from 'react';

interface QuestionsProps {
  currentPage: number;
  isSubmitted: boolean;
  onPageChange: (page: number) => void;
  onSubmit: () => void;
}

export function Questions({ currentPage, isSubmitted, onPageChange, onSubmit }: QuestionsProps) {
  const questions = [
    "Barco E2의 최대 입력 해상도는 얼마입니까?",
    "E2의 주요 출력 커넥터 유형은 무엇입니까?",
    "E2에서 레이어를 생성하는 방법은 무엇입니까?",
    "프리셋(Preset)을 저장하는 방법을 설명하시오.",
    "E2의 백업 전원 공급 장치(PSU)의 용도는 무엇입니까?",
    "스크린 대상(Screen Destination)을 설정하는 방법을 설명하시오.",
    "E2에서 소스를 전환하는 방법에는 어떤 것들이 있습니까?",
    "EDID 관리는 어떻게 하나요?",
    "E2의 네트워크 설정 방법을 설명하시오.",
    "시스템 업데이트는 어떻게 진행하나요?",
    "E2의 입력 지연시간(Input Delay)은 얼마인가요?",
    "Link 카드의 주요 기능은 무엇입니까?",
    "E2에서 사용할 수 있는 최대 레이어 수는 몇 개인가요?",
    "백그라운드 소스(Background Source)를 설정하는 방법을 설명하시오.",
    "User Key를 설정하는 방법과 용도를 설명하시오.",
    "MVR 출력 설정 방법을 설명하시오.",
    "AUX 출력의 용도와 설정 방법은 무엇입니까?",
    "E2의 냉각 시스템 관리 방법을 설명하시오.",
    "시스템 로그를 확인하는 방법은 무엇입니까?",
    "E2의 백업 파일을 생성하고 복원하는 방법을 설명하시오.",
    "E2의 Color Correction 기능을 설정하는 방법을 설명하시오.",
    "스틸 스토어(Still Store)의 사용 방법과 관리 방법을 설명하시오.",
    "멀티뷰어(Multiviewer) 레이아웃을 설정하는 방법은 무엇입니까?",
    "E2의 IP 주소를 변경하는 방법을 설명하시오.",
    "시스템 과열 시 대처 방법을 설명하시오.",
    "입력 신호 손실 시 백업 전환 설정 방법을 설명하시오.",
    "프레임 동기화(Frame Sync) 설정 방법을 설명하시오.",
    "테스트 패턴 생성 및 활용 방법을 설명하시오.",
    "HDCP 설정 및 문제해결 방법을 설명하시오.",
    "커스텀 해상도 생성 방법을 설명하시오.",
    "외부 컨트롤러와의 연동 방법을 설명하시오.",
    "타임코드 동기화 설정 방법을 설명하시오.",
    "RS-232 제어 프로토콜 설정 방법을 설명하시오.",
    "GPIO 설정 및 활용 방법을 설명하시오.",
    "이중화 시스템 구성 방법을 설명하시오.",
    "원격 제어 소프트웨어 설정 방법을 설명하시오.",
    "외부 동기화 신호(Genlock) 설정 방법을 설명하시오.",
    "다중 프로세서 연결 구성 방법을 설명하시오.",
    "외부 스위처와의 연동 방법을 설명하시오.",
    "웹 인터페이스 접속 및 설정 방법을 설명하시오.",
    "정기 유지보수 항목과 주기를 설명하시오.",
    "팬 필터 교체 방법과 주기를 설명하시오.",
    "시스템 에러 로그 분석 방법을 설명하시오.",
    "입출력 카드 교체 절차를 설명하시오.",
    "비상 시 시스템 복구 절차를 설명하시오.",
    "시스템 설정 백업 및 복원 절차를 설명하시오.",
    "펌웨어 업데이트 절차와 주의사항을 설명하시오.",
    "전원 공급 장치 문제 해결 방법을 설명하시오.",
    "네트워크 연결 문제 해결 방법을 설명하시오.",
    "시스템 초기화 절차와 주의사항을 설명하시오."
  ];

  const startIdx = currentPage * 10;
  const endIdx = startIdx + 10;
  const currentQuestions = questions.slice(startIdx, endIdx);

  // 컴포넌트가 마운트될 때 저장된 답변 불러오기
  useEffect(() => {
    currentQuestions.forEach((_, idx) => {
      const questionNumber = startIdx + idx + 1;
      const savedAnswer = localStorage.getItem(`question_${questionNumber}`);
      const textarea = document.querySelector(`textarea[data-question="${questionNumber}"]`) as HTMLTextAreaElement;
      if (textarea && savedAnswer) {
        textarea.value = savedAnswer;
        const countDisplay = textarea.nextElementSibling as HTMLElement;
        if (countDisplay) {
          countDisplay.textContent = `${savedAnswer.length} / 1000`;
        }
      }
    });
  }, [currentPage, startIdx, currentQuestions]);

  return (
    <div className="page">
      {currentQuestions.map((question, idx) => {
        const questionNumber = startIdx + idx + 1;
        return (
          <div key={questionNumber} className="question">
            <div className="question-content">
              <span className="question-number">{questionNumber}</span>
              <p>{question}</p>
            </div>
            <textarea
              className="answer-input"
              placeholder="답변을 입력하세요..."
              maxLength={1000}
              data-question={questionNumber}
              readOnly={isSubmitted}
              onChange={(e) => {
                const charCount = e.target.value.length;
                const countDisplay = e.target.nextElementSibling as HTMLElement;
                if (countDisplay) {
                  countDisplay.textContent = `${charCount} / 1000`;
                }
                localStorage.setItem(`question_${questionNumber}`, e.target.value);
              }}
            />
            <div className="char-count">0 / 1000</div>
          </div>
        );
      })}

      <div className="quiz-pagination">
        <button 
          onClick={() => onPageChange(0)} 
          disabled={isSubmitted}
          className={isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}
        >
          처음
        </button>
        {[0, 1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isSubmitted}
            className={`${currentPage === page ? 'active' : ''} ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {!isSubmitted && (
        <div className="text-center my-8">
          <button onClick={onSubmit} className="submit-btn">
            시험 제출하기
          </button>
        </div>
      )}
    </div>
  );
} 