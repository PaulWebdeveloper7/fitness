import PhoneAuth from '@/components/PhoneAuth'

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen w-full'>
        <h1 className=' text-6xl font-extrabold text-center my-6'>Sign Up</h1>
        
        <PhoneAuth/>
    </div>
  )
}

export default page