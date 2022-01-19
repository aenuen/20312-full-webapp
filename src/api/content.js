import axios from '@/libs/axios'

// 上传文件
export const contentUpload = (formData) => axios.post('/content/upload', formData)
