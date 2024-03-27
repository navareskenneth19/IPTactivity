import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strengthText, setStrengthText] = useState('');
  const [strengthColor, setStrengthColor] = useState('black');
  const [showEmailError, setShowEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*`]/.test(password);

    let strength = 0;

    if (password.length >= minLength) {
      strength++;
    }

    if (hasLowerCase) {
      strength++;
    }

    if (hasUpperCase) {
      strength++;
    }

    if (hasNumbers) {
      strength++;
    }

    if (hasSpecialChars) {
      strength++;
    }

    switch (strength) {
      case 1:
        setStrengthText('Weak');
        setStrengthColor('red');
        break;
      case 2:
        setStrengthText('Moderate');
        setStrengthColor('orange');
        break;
      case 3:
      case 4:
        setStrengthText('Strong');
        setStrengthColor('green');
        break;
      case 5:
        setStrengthText('Very Strong');
        setStrengthColor('darkgreen');
        break;
      default:
        setStrengthText('');
        setStrengthColor('black');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);

    setPasswordError('');
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    setShowEmailError(false);
  };

  const handleSubmit = () => {
    if (!email.trim() && !password.trim()) {
      alert('Email and password cannot be empty');
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Email or password cannot be empty');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowEmailError(true);
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password cannot be empty');
      return;
    }

    if (strengthText !== 'Strong' && strengthText !== 'Very Strong') {
      alert('Password should be strong');
      return;
    }

    alert('Submitted Successfully');

    setEmail('');
    setPassword('');
    setStrengthText('');
    setStrengthColor('black');
    setShowEmailError(false);
    setPasswordError('');
  };

  return (
    <div className='Background'>
      <div className='innerContainer'>
        <h1 className='title' style={{ color: strengthColor }}>
          Authentication
        </h1>
        <input
          className='input'
          placeholder='Email'
          type='email'
          value={email}
          onChange={handleEmailChange}
        />
        {showEmailError && !email.trim() && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>Email cannot be empty</span>}
        {showEmailError && email.trim() && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>Invalid email address</span>}
        <input
          className='input'
          placeholder='Password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{passwordError}</span>}
        <span style={{ color: strengthColor, fontSize: '14px', marginBottom: '5px' }}>{strengthText}</span>
        <button className='button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
