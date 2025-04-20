import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';
import { Bagian, SoalBagian, SoalUjianBagian } from "@/types/ujian-keahlian-akp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastValuePath(path: string) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export function generateInstrukturName(names: string) {
  const instruktur = names.split('/')
  return instruktur
}

export function getMonthName(monthValue: string) {
  const months: any = {
    "01": "Januari",
    "02": "Februari",
    "03": "Maret",
    "04": "April",
    "05": "Mei",
    "06": "Juni",
    "07": "Juli",
    "08": "Agustus",
    "09": "September",
    "10": "Oktober",
    "11": "November",
    "12": "Desember"
  };

  return months[monthValue] || "Invalid month";
}

export const generateRandomId = (): string => {
  return `${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
};

export function replaceUrl(input: string): string {
  const oldUrl = 'https://192.168.12.97:81/';
  const newUrl = 'https://elaut-bppsdm.kkp.go.id/api-elaut/';

  return input.replace(oldUrl, newUrl);
}

export function formatToRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
}

export function formatIndonesianDateFromString(input: string): string {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Split the input by "-"
  const [month, day, year] = input.split("-").map(Number);

  // Format the year (assuming 20XX for two-digit years)
  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  const monthName = months[month - 1];

  return `${day} ${monthName} ${fullYear}`;
}

export function generateRandomString(source: string, length: number): string {
  if (length <= 0) {
    throw new Error("Length must be greater than 0");
  }

  let result = "";
  const sourceLength = source.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * sourceLength);
    result += source[randomIndex];
  }

  return result;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}


// Convert setting time on app to be indonesian format
export function formatIndonesianDate(dateString: string): string {
  // Parse input date string
  const match = dateString.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) ([+-]\d{4}) (WIB|WIT|WITA)/);
  if (!match) {
    throw new Error("Invalid date format");
  }

  const [_, datePart, offset, timezone] = match;

  // Create a Date object with the timezone offset
  const date = new Date(datePart + offset);

  // Define Indonesian time zone mappings
  const timezoneMap: Record<string, string> = {
    WIB: "Asia/Jakarta",
    WITA: "Asia/Makassar",
    WIT: "Asia/Jayapura"
  };

  // Format the date to desired output
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezoneMap[timezone as keyof typeof timezoneMap],
    hour12: false
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date) + ` ${timezone}`;
}

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY || ''

// Encrypt function
export const encryptValue = (value: string | number): string => {
  const ciphertext = CryptoJS.AES.encrypt(value.toString(), SECRET_KEY).toString();
  return encodeURIComponent(ciphertext); // URL safe
};

// Decrypt function
export const decryptValue = (encryptedValue: string): string => {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedValue), SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const countDistinctMateri = (data: SoalUjianBagian[]) => {
  const materiCount: Record<string, number> = {}
  data.forEach((item: any) =>{
    if (item.Materi) {
      materiCount[item.Materi] =(materiCount[item.Materi] || 0) + 1;
    }
  })

  return Object.entries(materiCount).map(([name, count]) => ({name, count}))
} 

export const isTodaySameAs = (dateString: string): boolean => {
  const today = new Date();
  const inputDate = new Date(dateString);

  return (
    today.getFullYear() === inputDate.getFullYear() &&
    today.getMonth() === inputDate.getMonth() &&
    today.getDate() === inputDate.getDate()
  );
}

export const isTodayBefore = (dateString: string): boolean => {
  const today = new Date();
  const inputDate = new Date(dateString);

  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return today < inputDate;
}

export const isTodayBetween = (startDateString: string, endDateString: string): boolean => {
  const today = new Date();
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return today >= startDate && today <= endDate;
}
