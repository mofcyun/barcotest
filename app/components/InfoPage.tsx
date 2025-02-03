'use client';

import { useState } from 'react';

interface InfoPageProps {
  onNext: () => void;
}

interface UserInfo {
  company: string;
  department: string;
  position: string;
  name: string;
  age: string;
  phone: string;
}

export function InfoPage({ onNext }: InfoPageProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    company: '',
    department: '',
    position: '',
    name: '',
    age: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<UserInfo> = {};
    let isValid = true;

    // 모든 필드 필수 입력 검증
    Object.entries(userInfo).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof UserInfo] = '필수 입력 항목입니다.';
        isValid = false;
      }
    });

    // 전화번호 형식 검증
    const phonePattern = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
    if (userInfo.phone && !phonePattern.test(userInfo.phone)) {
      newErrors.phone = '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
      isValid = false;
    }

    // 나이 검증
    const age = parseInt(userInfo.age);
    if (isNaN(age) || age < 1 || age > 150) {
      newErrors.age = '올바른 나이를 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      onNext();
    }
  };

  const handleChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="title-page">
      <div className="decorative-shape shape1"></div>
      <div className="decorative-shape shape2"></div>
      <div className="title-content">
        <h2 className="text-3xl mb-10 text-gray-800 font-bold text-shadow animate-fadeIn">
          인적사항 입력
        </h2>
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-lg animate-slideUp">
          <div className="grid gap-6">
            <div className="input-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                회사명
              </label>
              <input
                type="text"
                value={userInfo.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            <div className="input-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                부서명
              </label>
              <input
                type="text"
                value={userInfo.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
            </div>

            <div className="input-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                직급명
              </label>
              <input
                type="text"
                value={userInfo.position}
                onChange={(e) => handleChange('position', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          ${errors.position ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position}</p>
              )}
            </div>

            <div className="input-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                이름
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="input-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                나이
              </label>
              <input
                type="number"
                value={userInfo.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            <div className="input-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                연락처
              </label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                          ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold
                     transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5
                     hover:shadow-lg"
          >
            시험 시작하기
          </button>
        </div>
      </div>
    </div>
  );
} 