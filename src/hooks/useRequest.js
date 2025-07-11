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
        reportCall: ({classId, year, month, token}) => {
            return request({
                endpoint: `call/call/report/${classId}/${year}/${month}`,
                params: {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
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