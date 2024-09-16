import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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