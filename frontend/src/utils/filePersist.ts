"use client";

const DB_NAME = "AuxlifyDB";
const STORE_NAME = "PendingFiles";
const DB_VERSION = 2;

let memoryStorage: File | null = null;
let useMemoryStorage = false;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      useMemoryStorage = true;
      return reject("IndexedDB not supported");
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = (e: any) => resolve(e.target.result);
      request.onerror = (e: any) => {
        console.warn("IndexedDB failed, using memory storage:", e);
        useMemoryStorage = true;
        reject("Failed to open IndexedDB");
      };
    } catch (e) {
      useMemoryStorage = true;
      reject(e);
    }
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
    console.warn("Using memory storage for file");
    useMemoryStorage = true;
    memoryStorage = file;
    return true;
  }
}

export async function getPendingFile(): Promise<File | null> {
  if (useMemoryStorage) {
    return memoryStorage;
  }
  
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
    console.warn("Using memory storage for file retrieval");
    useMemoryStorage = true;
    return memoryStorage;
  }
}

export async function clearPendingFile() {
  if (useMemoryStorage) {
    memoryStorage = null;
    return;
  }
  
  try {
    const db = await openDB();
    if (db.objectStoreNames.contains(STORE_NAME)) {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).delete("active-file");
    }
  } catch (error) {
    console.warn("Failed to clear from IndexedDB");
    memoryStorage = null;
  }
}
