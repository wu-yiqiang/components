import service from '@/utils/request'

export const upload = (formData: FormData, fn: object | null =  null) => {
  return service({
    url : "/file/upload",
    method: "post",
    data: formData,
    onUploadProgress: fn,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const merge = (data: string) => {
  return service.post({
    data: {file_hash:data},
  })
}
