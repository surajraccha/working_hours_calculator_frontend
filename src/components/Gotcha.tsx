import React from 'react';

const Gotcha: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontFamily: 'Comic Sans MS, cursive', 
      fontSize: '28px', 
      color: '#007bff', 
      textAlign: 'center' 
    }}>
      You’ve been waiting for something amazing... <br /> 
      And here it is: Nothing! 😜
    </div>
  );
};

export default Gotcha;