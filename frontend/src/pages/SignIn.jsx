
import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'



function SignIn() {

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const [fromData, setFromData] = useState({});


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFromData({
      ...fromData, [e.target.id] : e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/v1/auth/signin', {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(fromData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }
    catch(error){
      dispatch(signInFailure(error.message));
    }
    
  };

  console.log(fromData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit = {handleSubmit}>

        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          onChange = {handleChange}
          id='email'
          
        />

        <select 
          name="role" 
          id="role" 
          className='border p-3 rounded-lg'
          onChange = {handleChange}>
                <option className='opacity-75'>Select one option</option>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
        </select>

        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          onChange = {handleChange}
          id='password'
        />

        <button
          disabled={loading}
          className='bg-[#05445E] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form> 
      <div className='flex gap-2 mt-5'>
        <p>Do not have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div> 
      {error && <p className='text-red-500 mt-5'>{error}</p>}       
    </div>
  )
}

export default SignIn
