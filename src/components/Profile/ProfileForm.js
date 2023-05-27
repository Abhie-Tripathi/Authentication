import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { AuthContext } from '../../Auth-context/AuthContext';

const ProfileForm = () => {
  const authctx = useContext(AuthContext)
  const newPasswordInputRef = useRef()
  
  
  const submitHandler = (event) =>{
    event.preventDefault()

    const newenteredPassword = newPasswordInputRef.current.value

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",
    {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({
        idToken: authctx.token,
        password: newenteredPassword,
        returnSecureToken: false
      })
    }).then((data)=>{
      //Always succeed 
    })
    
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
