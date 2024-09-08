import React from 'react';

const URL = process.env.EXPO_PUBLIC_API_URL;

const useRequest = () => {

    const request = async({endpoint, params}) => {
        
        try {
            const response = await fetch(`${URL}/${endpoint}`, params);
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
        logout: ({data, token}) => {
            return request({
                endpoint: 'user/logout/',
                params: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                }                
            });
        },        
        me: (token) => {
            return request({
                endpoint: 'user/me/',
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
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
        },
        companyPending: ({data, token}) => {
            return request({
                endpoint: 'companys/pending/',
                params: {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            }); 
        },
        classRegister: ({data, token}) => {
            return request({
                endpoint: 'call/class/register/',
                params: {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            }); 
        },
        classList: ({company, token}) => {
            return request({
                endpoint: `call/class/list/${company}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            });             
        },
        studentRegister: ({data, token}) => {
            return request({
                endpoint: 'call/student/register/',
                params: {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            }); 
        }
    };

};

export default useRequest;