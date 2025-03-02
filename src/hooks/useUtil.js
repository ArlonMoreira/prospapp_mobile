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
  }
}

export default useUtil;