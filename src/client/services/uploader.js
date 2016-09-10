import axios from 'axios'

export const uploadFile = ({ file, url, onProgress }) => {
  const data = new FormData()
  data.append('file', file)
  const config = {
    onUploadProgress(progressEvent) {
      const percentCompleted = progressEvent.loaded / progressEvent.total
      console.log(percentCompleted)
      onProgress(percentCompleted)
    },
  }
  return axios.post(url, data, config).then(response => response.data)
}
