import { useState, useEffect } from 'react';

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getFormattedDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    setCurrentDate(getFormattedDate());
  }, []);

  return currentDate;
};

export default useCurrentDate;
