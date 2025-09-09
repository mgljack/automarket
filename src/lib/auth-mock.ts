import { AuthUser } from './types';

class AuthMock {
  private readonly STORAGE_KEY = 'automarket_user';
  private readonly LIKED_CARS_KEY = 'likedCars';

  // 임시 계정 데이터
  private readonly TEMP_ACCOUNTS: AuthUser[] = [
    {
      id: '1',
      email: 'test@automarket.mn',
      name: '테스트 사용자',
      phone: '+976-99112233',
      avatar: undefined
    }
  ];

  
  // 로그인
  login(email: string, password: string): { success: boolean; user?: AuthUser; message?: string } {
    // 간단한 비밀번호 체크 (실제로는 해시 비교)
    if (password !== '1234!') {
      return { success: false, message: '비밀번호가 올바르지 않습니다.' };
    }

    const user = this.TEMP_ACCOUNTS.find(account => account.email === email);
    if (!user) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    // 세션 저장
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  // 회원가입
  register(userData: Omit<AuthUser, 'id'>): { success: boolean; user?: AuthUser; message?: string } {
    // 이메일 중복 체크
    const existingUser = this.TEMP_ACCOUNTS.find(account => account.email === userData.email);
    if (existingUser) {
      return { success: false, message: '이미 사용 중인 이메일입니다.' };
    }

    // 새 사용자 생성
    const newUser: AuthUser = {
      ...userData,
      id: Date.now().toString()
    };

    // 임시 계정에 추가 (실제로는 서버에 저장)
    this.TEMP_ACCOUNTS.push(newUser);
    
    // 세션 저장
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  // 로그아웃
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // 현재 사용자 가져오기
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.STORAGE_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  // 로그인 상태 확인
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // 소셜 로그인 (모의)
  socialLogin(provider: 'google' | 'facebook' | 'apple'): { success: boolean; user?: AuthUser; message?: string } {
    // 소셜 로그인 시뮬레이션
    const socialUser: AuthUser = {
      id: `social_${Date.now()}`,
      email: `user@${provider}.com`,
      name: `${provider} 사용자`,
      phone: '+976-99000000',
      avatar: undefined
    };

    // 세션 저장
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(socialUser));
    return { success: true, user: socialUser };
  }

  // 좋아요한 차량 가져오기
  getLikedCars(): string[] {
    if (typeof window === 'undefined') return [];
    
    const likedCars = localStorage.getItem(this.LIKED_CARS_KEY);
    if (!likedCars) return [];

    try {
      return JSON.parse(likedCars);
    } catch {
      return [];
    }
  }

  // 차량 좋아요 토글
  toggleLike(carId: string): boolean {
    const likedCars = this.getLikedCars();
    const index = likedCars.indexOf(carId);
    
    if (index > -1) {
      likedCars.splice(index, 1);
    } else {
      likedCars.push(carId);
    }
    
    localStorage.setItem(this.LIKED_CARS_KEY, JSON.stringify(likedCars));
    return !likedCars.includes(carId);
  }

  // 사용자 정보 업데이트
  updateProfile(updates: Partial<AuthUser>): { success: boolean; user?: AuthUser; message?: string } {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: '로그인이 필요합니다.' };
    }

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  }

  // 계정 삭제
  deleteAccount(): { success: boolean; message?: string } {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: '로그인이 필요합니다.' };
    }

    // 세션 삭제
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.LIKED_CARS_KEY);
    
    return { success: true, message: '계정이 삭제되었습니다.' };
  }
}

export const authMock = new AuthMock();
