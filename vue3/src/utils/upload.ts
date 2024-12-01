// 文件上传功能:支持分片上传、断点续传、瞬时秒传、压缩上传功能

// filehash filename chunkhash chunk
// 亮点： 分片上传、断点续传、瞬时秒传、压缩上传、webWorker多线程处理、责任链模式文件大小动态分割、上传进度
import SparkMD5 from 'spark-md5'
import { merge, upload } from '@/api/file'
interface ChunkType {
  file: any
  file_name: string
  chunk_hash: string
}
class Upload {
  unit = 1024 * 1024 // 基本单位MB
  file: any
  fileHash = ''
  fileName: string
  fileSize: number
  fileCount = 0
  uploadedIndex = 0 // 正在上传文件的序列号
  chunkLists = [] as ChunkType[]
  compress = false
  chunckSize = 5 * this.unit
  progres = 0
  constructor(file: any) {
    this.file = file
    this.fileName = this.file?.name
    this.fileSize = this.file?.size
    this.FileHash()
  }
  // 计算文件哈希值
  private FileHash() {
    const spark = new SparkMD5.ArrayBuffer()
    this.FileHash = spark.append(this.file)
    this.createFileChunk()
  }
  // 分割文件
  private createFileChunk() {
    // 计算文件需要分割成几块
    this.fileCount = Math.ceil(this.fileSize / this.chunckSize)
    let i = 0
    while (i < this.fileCount) {
      let chunk = null
      const nextCount = i + 1
      if (nextCount == this.fileCount) {
        chunk = this.file.slice(i * this.chunckSize)
      } else {
        chunk = this.file.slice(i * this.chunckSize, nextCount * this.chunckSize)
      }
      this.chunkLists.push({
        file: chunk,
        chunk_hash: `${this.fileHash}_${i}`,
        file_name: this.fileName,
      })
      i++
    }
    this.fileUpload()
  }
  private async fileMerge() {
    const { data } = await merge(this.fileHash)
  }
  private async fileUpload() {
    for (this.uploadedIndex; this.uploadedIndex < this.chunkLists.length; this.uploadedIndex++) {
      const chunk = this.chunkLists[this.uploadedIndex]
      const formData = new FormData()
      formData.append('file', chunk.file)
      formData.append('chunk_hash', chunk.chunk_hash)
      formData.append('file_name', chunk.file_name)
      const { data } = await upload(formData)
      this.fileProgress()
      if (data?.message == '已上传')
        if (this.uploadedIndex + 1 == this.chunkLists.length) this.fileMerge()
    }
  }
  private fileProgress() {}
}

export default Upload
