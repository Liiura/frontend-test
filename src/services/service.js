import Axios from 'axios'
const URL = 'http://192.168.1.73:5000/api/'
const service= async (path, method, data) => {
  try {
    return await Axios({
      url: URL + path,
      method: method,
      data: data
    })
      .then((response) => {
        return response || 'ERROR'
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (err) {
    console.log(err)
  }
}
export default service