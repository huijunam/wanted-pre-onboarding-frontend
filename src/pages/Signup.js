// 회원가입 페이지
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup () {
    const [email, setEmail]= useState(''); // 이메일 
    const [password, setPassword]= useState(''); // 비밀번호 
    const [errorMessage, setErrorMessage]= useState(''); // 에러 메시지 
    const navigate = useNavigate();

    useEffect(() =>{
        const jwtToken= localStorage.getItem('jwt'); // 토큰 유효성 검사
        if (jwtToken){
            navigate('/todo');
        }
    },[navigate]);

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
            // SignUp api
            fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password}),
            })
            .then((response) => response.json())
            .then((data) =>{
                if (data.statusCode !==400){
                    setErrorMessage('');
                    navigate('/signin'); // 로그인 페이지로 이동 
                }else{
                    setErrorMessage('동일한 이메일이 이미 존재합니다.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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