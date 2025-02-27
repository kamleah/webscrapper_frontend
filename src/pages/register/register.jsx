import React, { useEffect, useState } from 'react';
import SiVerceImage from '../../components/Image/SiVerceImage';
import loginLogo from '../../assets/illustrations/login_illustration.jpg'
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { emailValidation, requiredField } from '../../utils/Validation/FormValidationRule';
import IconButton from '../../components/Button/IconButton';
import IconInput from '../../components/Input/IconInput';
import { Eye, EyeSlash } from 'iconsax-react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import leftimage from '../../assets/images/leftImage.png'
import { inputClass } from '../../utils/CustomClass';
import DocumentHead from '../../components/Document/DocumentHead';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [eyeIcon, setEyeIcon] = useState(false)
  const [loader, setLoader] = useState(false);

  // const { error, isLogged } = useSelector((state) => state.auth);

  const onSubmit = (data) => {

  };
//   I have provided 

  return (
    <>
      <DocumentHead title='Login' />
      <div className="w-full h-screen bgbackground flex justify-center items-center">
        <div className="p-5 md:p-3 flex items-center justify-center glass border-4 border-gray-50 shrink-0  w-[30%] rounded-3xl px-7 min-w-max" data-aos="fade-up" data-aos-duration="1000" delay="100">
          <div className="w-[27rem] md:w-[22rem] lg:w-[27rem] xl:w-[27rem] h-[30rem] xl:h-[30rem] lg:h-[30rem] md:h-[22rem] rounded-lg hidden sm:block p-5">
            <img src={leftimage} className='w-full h-full object-cover rounded-lg' loading='lazy' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="w-[20rem] md:w-[22rem] lg:w-[27rem] xl:w-[27rem] md:p-3 py-5 space-y-3">
              <div className="">
                <h2 className=" lg:mx-3 text-xl sm:text-3xl font-tbPop font-bold tracking-tight text-black">
                  Hello <span className='text-blue-400'>Welcome!</span>
                </h2>
                <h5 className="lg:mx-3 text-sm sm:text-base font-tbPop font-medium text-gray-400">
                  Please SignUp to Dashboard!
                </h5>
              </div>

              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
              <div>
                  <label htmlFor="email" className="block text-base font-tbPop font-medium leading-6 text-gray-500">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder='First Name'
                      autoComplete="text"
                      required
                      className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                      {...register('first_name', { required: true })}
                    />
                    {errors.first_name && <Error title={'First Name is required*'} />}
                  </div>

                </div>
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
                    {errors.email && <Error title={'Email is required*'} />}
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
                    {errors.password && <p className='text-red-500 text-xs'>Password is required*</p>}
                  </div>
                </div>
                <div className='pt-3'>
                  {loader ? <LoadBox title='Submitting' /> : <button
                    type="submit"
                    className="flex w-full justify-center font-tbPop rounded-md bg-blue-500 px-3 py-2.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    Sign up
                  </button>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register