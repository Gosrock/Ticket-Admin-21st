import axios from 'axios';
const client = axios.create();
/* 
글로벌 설정 예시 :
//api 주소를 다른곳으로 사용함
client.default.baseURL = 'https://external-api-server.com/'

//헤더설정
client.default.headers.common['Authorization']='Bearer a1b2c3d4';

//인터셉터 설정
axios.intercepter.response.use(\
    response =>{
        //요청 성공 시 특정 작업 수행
        return response;
    },
    error =>{
        //요청 실패 시 특정 작업 수행
        return Promise.reject(error);
    }
    })
    */

export default client;
