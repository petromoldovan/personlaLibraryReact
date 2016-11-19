import constants from '../constants';
import Api from '../lib/api';
import {browserHistory} from 'react-router';
import jwt from 'jsonwebtoken'

import {setUserBooks} from './state';

export function getUserBooks(opt={}){
    return (dispatch) => {
        const api = new Api();
        api.getUserBooks()
            .then((resp) => {
                dispatch(setUserBooks(resp))
                if(opt.then && opt.then instanceof Function) {opt.then()}
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

export function userLogin(data, opt={}){
    return(dispatch)=>{
        const api = new Api();
        api.login(data)
        .then((resp)=>{
            const token = resp.token;
            localStorage.setItem('jwtToken', token)

            //this is user
            console.log(jwt.decode(token))

            if (token){
                browserHistory.push('library')
            }
        })
        .catch((err)=>{
            console.log("smth went wrong")
        })
    }
}
