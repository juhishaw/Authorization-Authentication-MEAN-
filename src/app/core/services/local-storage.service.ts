import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  setLocalStorage(values: any) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        localStorage.setItem(key, JSON.stringify(values[key]));
      }
    }
  }

  setItemInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  resetLocalStorage() {
    localStorage.clear();
  }

  deleteLocalStorage(key) {
    localStorage.removeItem(key);
  }
}
