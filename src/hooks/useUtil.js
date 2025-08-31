import React from 'react'

const useUtil = () => {
  return {
    ordenarObjectAsc: (data, index) => { //Ordenar ascendente
        return data.sort(function(a,b){
            if (a[index] > b[index]) return 1;
            if (a[index] < b[index]) return -1;
            return 0;            
        });

    },   
    ordenarObjectDesc: (data, index) => { //Ordenar decrescente
        return data.sort(function(a,b){
            if (a[index] < b[index]) return 1;
            if (a[index] > b[index]) return -1;
            return 0;         
        });

    },
    ordenarKeysObjectAsc: (obj) => {
      return Object.keys(obj)
        .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .reduce((acc, key) => {
          acc[key] = obj[key];
          return acc;
        }, {});
    },
    ordenarKeysObjectDesc: (obj) => {
      return Object.keys(obj)
        .sort((a, b) => b.localeCompare(a, "pt-BR"))
        .reduce((acc, key) => {
          acc[key] = obj[key];
          return acc;
        }, {});
    },    
    formatDate: (date) => {
      if (!date) return ''; // Se for null ou undefined
      const d = new Date(date); // Garante que seja Date
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
      const ano = d.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },
    formatTime: (date) => {
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })      
    },
    formatHour: (datetime) => {
      return new Date(datetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }    
  }
}

export default useUtil;