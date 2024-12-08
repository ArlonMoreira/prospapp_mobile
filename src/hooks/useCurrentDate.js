import { useState, useEffect } from 'react';

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentHour, setCurrentHour] = useState('');

  useEffect(() => {
    const getFormattedDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const getFormattedHour = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    setCurrentHour(getFormattedHour());
    setCurrentDate(getFormattedDate());

  }, []);

  return { currentDate, currentHour };

};

export default useCurrentDate;
