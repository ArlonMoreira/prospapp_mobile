import React from 'react';

const URL = process.env.EXPO_PUBLIC_API_URL;

const useRequest = () => {

    const request = async({endpoint, params}) => {
  
        try {
            const response = await fetch(`${URL}${endpoint}`, params);

            const result = await response.json();

            const request = {
                success: response.ok,
                ...result
            };

            return request;

        } catch(error){
            return {
                success: false,
                message: 'Falha de comunicação com o servidor.'
            };
        }

    };

    return {
        login: (data) => {
            return request({
                endpoint: 'user/signin/',
                params: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            });
        },
        register: (data) => {
            return request({
                endpoint: 'user/register/',
                params: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            });
        },
        companyList: (token) => {
            return request({
                endpoint: 'companys/pending/',
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            });            
        }
    };

};

export default useRequest;