import service from '@/utils/request'

export const upload = (formData: FormData) => {
  return service.post({
    Headers: {
      'Contents-type': 'FormData',
    },
  })
}

export const merge = (data: string) => {
  return service.post({
    data: {file_hash:data},
  })
}