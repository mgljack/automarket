'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authMock } from '@/lib/auth-mock';
import { AuthUser } from '@/lib/types';

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const currentUser = authMock.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone
    });
  }, [router]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setMessage('');

    const result = authMock.updateProfile(formData);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsEditing(false);
      setMessage('프로필이 성공적으로 업데이트되었습니다.');
    } else {
      setMessage(result.message || '프로필 업데이트에 실패했습니다.');
    }
    
    setIsSaving(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    }
    setIsEditing(false);
    setMessage('');
  };

  const handleDeleteAccount = () => {
    if (confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      authMock.deleteAccount();
      router.push('/');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필</h1>
          <p className="text-lg text-gray-600">계정 정보를 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">기본 정보</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary px-4 py-2"
                  >
                    편집
                  </button>
                )}
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-xl ${
                  message.includes('성공') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900">{user.phone}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? '저장 중...' : '저장'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary px-6 py-2"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="card text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-semibold text-2xl">
                  {user.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Account Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">계정 통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">가입일</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">좋아요</span>
                  <span className="font-medium">
                    {authMock.getLikedCars().length}개
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">내 공고</span>
                  <span className="font-medium">
                    {JSON.parse(localStorage.getItem('myListings') || '[]').length}개
                  </span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-red-200">
              <h3 className="text-lg font-semibold text-red-600 mb-4">위험 구역</h3>
              <p className="text-sm text-gray-600 mb-4">
                계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="w-full btn-accent bg-red-600 hover:bg-red-700 text-white"
              >
                계정 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
