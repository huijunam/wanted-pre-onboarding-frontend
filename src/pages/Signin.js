// 로그인 페이지
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin () {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // 이메일 
    const [password, setPassword] = useState(''); // 비밀번호 
    const [errorMessage, setErrorMessage] = useState(''); // 에러메시지 

    useEffect(() =>{
        const jwtToken= localStorage.getItem('jwt'); // 토큰 유효성 검사
        if (jwtToken){
            navigate('/todo');
        }
    },[navigate]);
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignin = () => {
        //  SignIn api
        fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        })
        .then((response) => response.json())
        .then((data) =>{
            if (data.access_token) {
                localStorage.setItem('jwt', data.access_token); // 토큰 저장 
                navigate('/todo'); // todo 페이지로 이동 
            }else{
                setErrorMessage('로그인에 실패했습니다.');
            }
        })
        .catch((error) =>{
            setErrorMessage('로그인에 실패했습니다.');
        })

    };

    return (
      <div>
        <h1>로그인 페이지</h1>
        <p>로그인 페이지입니다.</p>
        <input 
            data-testid="email-input"
            type="email"
            value= {email}
            onChange={handleEmailChange}
            placeholder="이메일" />
        <input 
            data-testid="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호" />

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button data-testid="signin-button" onClick={handleSignin}>로그인</button>
      </div>
    );
  };
  
  export default Signin;