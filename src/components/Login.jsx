import React from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import authServices from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

function LoginForm() {
  const navigate=useNavigate()
  const {register,handleSubmit}=useForm()
  const dispatch=useDispatch()
  const loginUser=async(data)=>{
   try {
     const userA=await authServices.loginUser(data)
     if(userA){
        const userData=await authServices.getCurrentUser()
        dispatch(login({userData}))
        localStorage.setItem("userData",JSON.stringify(userData))
        navigate("/")
     }
   } catch (error) {
      console.log("error while logging in user",error);
      
   }
   
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(loginUser)}>
                  <div>
                      <Input
                      label="email"
                      type='email'
                      placeholder="enter the email"
                      {...register("email",{required:true})}
                      />
                  </div>
                  <div>
                      <Input
                      label="password"
                      type="password"
                      placeholder="password"
                      {...register("password",{required:true})}
                      />
                  </div>
                 
                     
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <button onClick={()=>navigate("/sign-up")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
)
}
export default LoginForm