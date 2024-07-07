import React from 'react';

const URL = process.env.EXPO_PUBLIC_API_URL;

const useRequest = () => {

    const request = async({data, endpoint}) => {
  
        try {
            const response = await fetch(`${URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

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
            return request({data, endpoint: 'user/signin/'});
        },
        register: (data) => {
            return request({data, endpoint: 'user/register/'});
        }
    };

};

export default useRequest;