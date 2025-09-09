const LIKES_STORAGE_KEY = 'am_likes';

class LikesMock {
  private getLikes(): string[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  private setLikes(likes: string[]): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
  }

  addLike(carId: string): void {
    const likes = this.getLikes();
    if (!likes.includes(carId)) {
      likes.push(carId);
      this.setLikes(likes);
    }
  }

  removeLike(carId: string): void {
    const likes = this.getLikes();
    const index = likes.indexOf(carId);
    if (index > -1) {
      likes.splice(index, 1);
      this.setLikes(likes);
    }
  }

  isLiked(carId: string): boolean {
    const likes = this.getLikes();
    return likes.includes(carId);
  }

  getLikedCars(): string[] {
    return this.getLikes();
  }

  clearLikes(): void {
    this.setLikes([]);
  }
}

export const likesMock = new LikesMock();
