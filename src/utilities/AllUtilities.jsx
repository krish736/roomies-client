import axios from "axios"

const getCountries = async () => {
    try {
      const result = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
      const list = result?.data?.data
      console.log(list, 2029128)
      return list
    } catch (error) {
      return error
    }
  }

export {
    getCountries, 
}