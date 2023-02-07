import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Cookie {
  get(key: string) {
    return cookies.get(key);
  }
  set(key: string, value: string, options?: object) {
    cookies.set(key, value, options);
  }
  remove(key: string) {
    cookies.remove(key);
  }
}

export const cookie = new Cookie();

export const storage = {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
