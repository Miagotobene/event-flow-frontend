const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const fetchLogin = async(formData)=>{
    try{
        const res = await fetch(`${BASE_URL}/users/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        console.log('Log-in Response status:', res.status);
       
        const data = await res.json()
        console.log('Log-in Response data:', data);
        if(data.err){
            throw new Error(data.err)
        }
        if (data.token) {
          localStorage.setItem('token', data.token); // add this line to store the JWT token in localStorage
          const user = JSON.parse(atob(data.token.split('.')[1]));
          return {
            status: res.status,
            user:user
          }
        }
    }catch(error){
        console.log(error)
        throw error
    }
}

const fetchSignup = async (formData) => {
    try {
      let response = await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      let data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);
      if (data.err) {
        throw new Error(data.err);
      }
      if (data.token) {
        localStorage.setItem('token', data.token); 
        const user = JSON.parse(atob(data.token.split('.')[1]));
        return {
          status: response.status,
          user:user
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUser = () =>  {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  }

export {fetchLogin, fetchSignup, getUser}