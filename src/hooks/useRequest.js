import React from 'react';
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const URL = process.env.EXPO_PUBLIC_API_URL;

const useRequest = () => {

    const request = async ({ endpoint, params }) => {
        // Remove barras duplicadas
        const cleanURL = `${URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

        try {
            const response = await fetch(cleanURL, {
                ...params,
                redirect: 'manual' // Evita perda de header em redirect no iOS
            });

            const result = await response.json();

            return {
                success: response.ok,
                ...result
            };

        } catch (error) {
            console.log('Fetch error:', error);
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
        refreshToken: async (user) => {

            try {
                const { token, refresh } = user;

                const decodedToken = jwtDecode(token);

                const tokenExpirationDate = dayjs.unix(decodedToken.exp);
                const isTokenExpired = tokenExpirationDate.diff(dayjs()) < 1;

                if (!isTokenExpired) {
                    return {
                        success: true,
                        message: 'Token ainda nao foi expirado.',
                        isRefresh: false,
                        data: user
                    };
                }

                const response = await fetch(`${URL.replace(/\/$/, '')}/user/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refresh })
                });

                const result = await response.json();

                return {
                    success: response.ok,
                    isRefresh: true,
                    ...result
                };

            } catch (error) {
                console.log("ERRO NO REFRESH TOKEN:", error);
                return {
                    success: false,
                    message: 'Erro ao decodificar token ou no refresh.'
                };
            }
            
        },
        register: (data) => {
            return request({
                endpoint: 'user/register_v2/',
                params: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            });
        },
        register_check: (data) => {
            return request({
                endpoint: 'user/register_check/',
                params: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            });
        },
        register_refresh_code: (data) => {
            return request({
                endpoint: 'user/register_refresh_code/',
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
        resetpassword: ({data, token}) => {
            return request({
                endpoint: 'user/resetpassword/',
                params: {
                    method: 'PUT',
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
        change: ({token, data}) => {
            return request({
                endpoint: 'user/change/',
                params: {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
        listUsersManager: ({companyId, token}) => {
            return request({
                endpoint: `companys/listusers/${companyId}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            }); 
        },
        updateUsersManager: ({companyId, userId, data, token}) => {
            return request({
                endpoint: `companys/listusers/${companyId}/${userId}/`,
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
                endpoint: 'call/class/relate/register/',
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
                endpoint: `call/class/relate/list/${company}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            });             
        },
        classUsersList: ({ company, classId, token }) => {
            return request({
                endpoint: `call/class/relate/users/${company}/${classId}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            });
                        
        },
        classUsersAddUser: ({ data, token }) => {
            return request({
                endpoint: `call/class/relate/addusers/`,
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
        classChange: ({classId, data, token}) => {
            return request({
                endpoint: `call/class/change/${classId}/`,
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
        classRemove: ({classId, token}) => {
            return request({
                endpoint: `call/class/disabled/${classId}/`,
                params: {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },                    
                }
            })
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
        },
        studentList: ({classId, date, token}) => {
            return request({
                endpoint: `call/student/list/${classId}/${date}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }                
            });             
        },
        studentChange: ({student, token, data}) => {
            return request({
                endpoint: `call/student/change/${student}/`,
                params: {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)                   
                }
            })
        },
        studentRemove: ({student, token}) => {
            return request({
                endpoint: `call/student/disabled/${student}/`,
                params: {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },                    
                }
            })
        },        
        callRegister: ({data, token}) => {
            return request({
                endpoint: 'call/call/register/',
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
        callRemove: ({data, classId, token}) => {
            return request({
                endpoint: `call/call/remover/${classId}/`,
                params: {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            });             
        },        
        reportCall: ({ classId, year, month, token }) => {
            return request({
                endpoint: `call/call/report/${classId}/${year}/${month}/`,
                params: {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token.trim()}`, // Remove espaços indesejados
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            });
        },
        pointLocalsList: ({ companyId, token }) => {
            return request({
                endpoint: `point/local/list/${companyId}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            })
        },
        pointLocalRegister: ({ data, token }) => {
            return request({
                endpoint: 'point/local/register/',
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
        pointLocalEdit: ({ data, token, localId }) => {
            return request({
                endpoint: `point/local/change/${localId}/`,
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
        pointLocalRemove: ({ token, localId }) => {
            return request({
                endpoint: `point/local/disabled/${localId}/`,
                params: {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }                
            }); 
        },               
        pointRegister: ({ data, token }) => {
            return request({
                endpoint: 'point/register/',
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
        pointJustify: ({ data, token }) => {
            return request({
                endpoint: 'point/justify/',
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
        pointList: ({ localId, token }) => {
            return request({
                endpoint: `point/current/${localId}/`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            })
        },   
        pointRemoveToday: ({ pointId, token }) => {
            return request({
                endpoint: `point/remove/today/${pointId}/`,
                params: {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }                
            })
        },
        pointReport: ({ data, token }) => {
            return request({
                endpoint: `point/report/`,
                params: {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }                
            })
        },       
    };

};

export default useRequest;