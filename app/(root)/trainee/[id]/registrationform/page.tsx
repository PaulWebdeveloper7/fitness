const page = () => {
  return (
    <div>
        <h1>Add a new client </h1>
        <form className="px-6 flex gap-6 flex-col">
              <label htmlFor="client" className=" flex flex-col">
              Enter your client's name 
                <input type="text" name="client" id="client" /> 
              </label>
              <label htmlFor="phoneno">
              Enter client's phone number
                <input type="text" name="phoneno" id="phoneno" />  
              </label>
              <label htmlFor="address">
              Enter client's email address
                <input type="text" name="address" id="address" /> 
              </label>
              <label htmlFor="membership">
                Enter client's membership
              <select
                  id="role"
                  name="role"
                >
                  <option>Select your role</option>
                  <option value="basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>            
                  </label>
            </form>
    </div>
  )
}

export default page