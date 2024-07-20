const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const fetchLogin = async(formData)=>{
    try{
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.err){
            throw new Error(data.err)
        }
        return data;
    }catch(error){
        console.log(error)
        throw error
    }
}

export {fetchLogin}