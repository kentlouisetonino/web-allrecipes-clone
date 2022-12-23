import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Navbar from 'src/components/Navbar'
import Spinner from 'src/components/Spinner'
import Header from 'src/components/Head'
import InputField from 'src/components/InputField'
import PasswordCheckbox from 'src/components/PasswordCheckbox'
import { registerAPI } from 'src/api/auth'
import { registerValidator } from 'src/helpers/validators'
import { CookiesStorage, PageRoute } from 'src/helpers/enums'

const Register: NextPage = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInputsValid, setIsInputsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    setIsLoading(true)

    registerAPI({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      setIsLoading: setIsLoading,
      router: router,
    })
  }

  useEffect(() => {
    registerValidator
      .isValid({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((valid) => {
        if (valid) setIsInputsValid(true)
        else setIsInputsValid(false)
      })
  }, [email, password])

  useEffect(() => {
    if (Cookies.get(CookiesStorage.ACCESS_TOKEN)) {
      router.push(PageRoute.HOME)
    }
  }, [])

  return (
    <>
      <Header title='All Recipes | Register' />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Navbar currentPage='register' />
          <div className='d-flex justify-content-center mt-5'>
            <div className='w-50 mt-5'>
              <div className='mb-4'>
                <InputField
                  label='First Name'
                  type='text'
                  placeholder='Enter your first name'
                  value={firstName}
                  onChange={setFirstName}
                />
              </div>

              <div className='mb-4'>
                <InputField
                  label='Last Name'
                  type='text'
                  placeholder='Enter your last name'
                  value={lastName}
                  onChange={setLastName}
                />
              </div>

              <div className='mb-4'>
                <InputField
                  label='Email'
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={setEmail}
                />
              </div>
              <div className='mb-2'>
                <InputField
                  label='Password'
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={setPassword}
                  domId={'password'}
                />
              </div>
              <div className='mb-5 form-check'>
                <PasswordCheckbox />
              </div>
              <button
                disabled={email && password && isInputsValid ? false : true}
                className={`btn btn-secondary w-100 mt-3`}
                onClick={() => onSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Register
