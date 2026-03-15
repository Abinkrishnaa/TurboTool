"use client";

const DB_NAME = "TurboToolDB";
const STORE_NAME = "PendingFiles";
const DB_VERSION = 2; // Bumped version to ensure onupgradeneeded runs

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (e: any) => resolve(e.target.result);
    request.onerror = () => reject("Failed to open IndexedDB");
  });
}

export async function savePendingFile(file: File) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      
      const putRequest = store.put(file, "active-file");
      putRequest.onsuccess = () => resolve(true);
      putRequest.onerror = () => reject("Failed to save file");
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getPendingFile(): Promise<File | null> {
  try {
    const db = await openDB();
    if (!db.objectStoreNames.contains(STORE_NAME)) return null;
    
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const getReq = store.get("active-file");
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => resolve(null);
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function clearPendingFile() {
  try {
    const db = await openDB();
    if (db.objectStoreNames.contains(STORE_NAME)) {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).delete("active-file");
    }
  } catch (error) {
    console.error(error);
  }
}
