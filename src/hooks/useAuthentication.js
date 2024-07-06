import React from 'react';

const useAuthentication = () => {

    const login = async(data) => {

        try {
            const response = await fetch(``, {
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
                message: 'Erro interno no sistema. Contate o administrador.'
            };
        }

    };

    return {
        login
    };

};

export default useAuthentication;