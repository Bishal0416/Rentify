import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";



function SignUp() {

  const [loading, setLoading] = useState(null);
  const [fromData, setFromData] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFromData({
      ...fromData, [e.target.id] : e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API}/api/v1/auth/signup`, {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(fromData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch(error){
      setLoading(false);
      setError(error.message);
    }
    
  };

  console.log(fromData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit = {handleSubmit}>
        <input
          type='text'
          placeholder='first name'
          className='border p-3 rounded-lg'
          onChange = {handleChange}
          id='firstName'
          
        />
        <input
          type='text'
          placeholder='last name'
          className='border p-3 rounded-lg'
          onChange = {handleChange}
          id='lastName'
          
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          onChange = {handleChange}
          id='email'
          
        />
        <input
          type='text'
          placeholder='phone number'
          className='border p-3 rounded-lg'
          onChange = {handleChange}
          id='phoneNo'
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {/* <OAuth/> */}
      </form> 
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div> 
      {error && <p className='text-red-500 mt-5'>{error}</p>}       
    </div>
  )
}

export default SignUp
