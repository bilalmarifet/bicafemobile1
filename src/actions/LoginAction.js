import {Alert,AsyncStorage} from 'react-native';
import axios from 'axios';
import {LOGIN_CHANGE,LOGIN_USER,LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, REGISTER_CREATE_FAILED, REGISTER_CREATE_SUCCESS} from './types';
import { navigate } from '.././services/navigator';
import qs from 'qs';

export const LoginChanged = ({ props, value }) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_CHANGE,
      payload: { props, value }
    });
    

  };
  };

export const LoginMember=({username,password})=>{
  
  return(dispatch)=>{
    dispatch({
      type:LOGIN_USER
    }); 


    if(username=='' || password=='')
    {
      Alert.alert("Tüm alanları doldurunuz.");
    }
    axios.post('http://test3.makinaturkiye.com/api/member/anymember?username='+username+'&password='+password).then((response)=>{
      if(response.data!='0')
      {
        //console.log(response.data);
       

        axios.post('http://test3.makinaturkiye.com/token', qs.stringify({ 'grant_type': 'password','username':response.data.MemberUserName,'password':password }))
        .then(function(response1){
          AsyncStorage.setItem('memberId',response.data.MemberID.toString());
          
          AsyncStorage.setItem('accessToken',response1.data.access_token);
          dispatch({
            type:LOGIN_USER_SUCCESS
          });
          navigate('Home');
      
     
        }).catch(function(error){
          dispatch({
            type:LOGIN_USER_FAILED
          });
          Alert.alert('Bir Hata Oluştu Düzeltmek İçin uğraşıyoruz.');

          console.log(error);
        });
        
      }
      else
      {
        Alert.alert("Kullanıcı Adı Veya Şifre Hatalı.");
        dispatch({
          type:LOGIN_USER_FAILED
        });

      }

    });



  };
};
