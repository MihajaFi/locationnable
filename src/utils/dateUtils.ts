// src/utils/dateUtils.ts
export const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  
  export const calculateDaysBetween = (startDate: Date, endDate: Date): number => {
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  };
  