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
    formatDate: (date) => {
      return date.toLocaleDateString('pt-BR'); // Ex: 07/05/2025
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