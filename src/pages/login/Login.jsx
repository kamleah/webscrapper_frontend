import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import leftimage from '../../assets/images/logo-craft.png'
import { inputClass } from '../../utils/CustomClass';
import DocumentHead from '../../components/Document/DocumentHead';
import { setLoggedUser, setLoggedUserDetails, setRole, setToken } from '../../redux/authSlice/authSlice';
import axios from 'axios';
import { authEndPoints } from '../../endPoints/AuthEndPoint';
import LoadBox from '../../components/Loader/LoadBox';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/Errors/Error';

const Login = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [eyeIcon, setEyeIcon] = useState(false)
  const [loader, setLoader] = useState(false);

  const onSubmit = (payload) => {
    try {
      setLoader(true);
      axios.post(`${authEndPoints.login}`, payload).then((response) => {
        setLoader(false);
        dispatch(setToken({ ...response.data.data, isLogged: true }));
        dispatch(setRole({ role: response.data.data.user_role.name }));
        dispatch(setLoggedUserDetails({ ...response.data.data }));
        navigate('/');
      }).catch((error) => {
        toast.error('Please Enter Valid Credentails')
        console.log(error);
      })
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      <DocumentHead title='Login' />
      <div className="w-full h-screen bgbackground flex justify-center items-center">
        <div className="p-5 md:p-3 flex items-center justify-center glass border-4 border-gray-50 shrink-0  w-[30%] rounded-3xl px-7 min-w-max" data-aos="fade-up" data-aos-duration="1000" delay="100">
          <div className="w-[27rem] md:w-[22rem] lg:w-[27rem] xl:w-[27rem] h-[30rem] xl:h-[30rem] lg:h-[30rem] md:h-[22rem] rounded-lg hidden sm:block p-5 justify-center items-center flex-col " style={{ display: 'flex' }} >
            <img src={leftimage} className='object-cover rounded-lg' loading='lazy' />
            <h5 className='mt-2 text-lg text-primary' >CRAFT PDP MAKER</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="w-[20rem] md:w-[22rem] lg:w-[27rem] xl:w-[27rem] md:p-3 py-5 space-y-3">
              <div className="">
                <h2 className=" lg:mx-3 text-xl sm:text-3xl font-tbPop font-bold tracking-tight text-black">
                  Hello <span className='text-primary'>Again!</span>
                </h2>
                <h5 className="lg:mx-3 text-sm sm:text-base font-tbPop font-medium text-gray-400">
                  Please SignIn to Dashboard!
                </h5>
              </div>

              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
                <div>
                  <label htmlFor="email" className="block text-base font-tbPop font-medium leading-6 text-gray-500">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder='Email address'
                      autoComplete="email"
                      required
                      className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                      {...register('email', { required: true })}
                    />
                    {errors?.email && <Error title={'Email is required*'} />}
                  </div>

                </div>
                <div>
                  <div className="">
                    <label htmlFor="password" className="block font-tbPop text-base font-medium leading-6 text-gray-500">
                      Password
                    </label>
                  </div>
                  <div className="mt-1 relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      placeholder='Password'
                      type={!eyeIcon ? "password" : "test"}
                      autoComplete="current-password"
                      required
                      className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                      {...register('password', { required: true })}
                    />
                    <span className="absolute right-2 z-10 bg-neutral-100" onClick={() => setEyeIcon(!eyeIcon)}>
                      {
                        eyeIcon ?
                          <Eye size={24} className='text-gray-400 cursor-pointer' /> :
                          <EyeSlash size={24} className='text-gray-400 cursor-pointer' />
                      }
                    </span>
                  </div>
                  {errors?.password && <Error title={'Password is required*'} />}
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!isValid || loader}
                    className={`flex w-full justify-center font-tbPop rounded-md px-3 py-2.5 text-base font-semibold text-white shadow-sm ${isValid ? 'bg-primary hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}`} >
                    {loader ? 'Signing In...' : 'Sign in'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Login