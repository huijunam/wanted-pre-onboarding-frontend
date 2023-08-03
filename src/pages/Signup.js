// 회원가입 페이지
import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [errorMessage, setErrorMessage]= useState('');

    const handleEmailChange =(e) =>{
        setEmail(e.target.value);
    };

    const handlePasswordChange =(e) =>{
        setPassword(e.target.value);
    };

    const handleSignup =() =>{
        if (!isEmailValid(email)){
            setErrorMessage('이메일 형식이 올바르지 않습니다.');
        }else if (password.length <8 ){
            setErrorMessage('비밀번호는 8자 이상이어야 합니다.');
        }else{
            console.log('Signup successful!');
            setErrorMessage('');
        }
    };
    // email 유효성 검사
    const isEmailValid = (email) => {
        return email.includes('@');
      };
    // password 유효성 검사
    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const isFormValid= isEmailValid(email) && isPasswordValid(password);

    return (
      <div>
        <h1>회원가입 페이지</h1>
        <p>회원가입 페이지입니다.</p>
        {/* 예시 */}
        <input 
            data-testid="email-input"
            type= "email"
            value= {email}
            onChange= {handleEmailChange}
            placeholder="이메일" />
        <input 
            data-testid="password-input"
            type= "password"
            value= {password}
            onChange= {handlePasswordChange}
            placeholder="비밀번호" />
        {errorMessage && <p style={{color: 'red' }} > {errorMessage}</p> }
        <button data-testid="signup-button" onClick= {handleSignup} disabled= {!isFormValid}>회원가입</button>
      </div>
    );
  };
  
  export default Signup;