const ForgotForm = ({handleBacktoLogin}) => {
  
  return (
    <div>
      <h1>Forgot Password</h1>
      <input type="text" placeholder="Enter your mobile/email" /><br />
      <button onClick={handleBacktoLogin}> Back</button>
      <button>Send OTP</button>
    </div>
  );
};

export default ForgotForm;
