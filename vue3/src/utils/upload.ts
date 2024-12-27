// 文件上传功能:支持分片上传、断点续传、瞬时秒传、压缩上传功能

// filehash filename chunkhash chunk
// 亮点： 分片上传、断点续传、瞬时秒传、压缩上传、webWorker多线程处理、责任链模式文件大小动态分割、上传进度
import SparkMD5 from 'spark-md5'
import { merge, upload } from '@/api/file'
interface ChunkType {
  file: File
  file_name: string
  chunk_hash: string
}
class Upload {
  unit = 1024 * 1024 // 基本单位MB
  chunkRange = [0, 100, 300, 500, 1024, 2048, 5120, 10240]
  file: File
  fileHash = ''
  fileName: string
  fileSize: number
  fileCount = 0
  uploadedIndex = 0 // 正在上传文件的序列号
  chunkLists = [] as ChunkType[]
  compress = false
  chunckSize = 0
  progres = 0
  constructor(file: File) {
    this.file = file
    this.fileName = this.file?.name
    this.fileSize = this.file?.size
    this.chunkRange = this.chunkRange.map((i) => (i = i * this.unit))
    this.FileHash()
  }
  // 计算文件哈希值
  private FileHash() {
    const spark = new SparkMD5.ArrayBuffer()
    spark.append(this.file)
    this.fileHash = spark.end()
    this.setChunkSize()
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
    await merge({ file_name: this.fileName, size: this.fileSize })
  }
  private async fileUpload() {
    const chunks = []
    while (this.uploadedIndex < this.chunkLists.length) {
      const chunk = this.chunkLists[this.uploadedIndex]
      chunks.push(upload(this.chunkUpload(chunk)))
      this.uploadedIndex++
    }
    await Promise.all(chunks)
    await this.fileMerge()
  }
  private chunkUpload(chunk: ChunkType) {
    const formData = new FormData()
    formData.append('file', chunk.file)
    formData.append('chunk_hash', chunk.chunk_hash)
    formData.append('file_name', chunk.file_name)
    return formData
  }
  private isRange(range: object, value: number) {
    if (!Array.isArray(range)) return false
    const v1 = range[0]
    const v2 = range[1]
    if (value >= v1 && value < v2) return true
    return false
  }
  private setChunkSize() {
    if (this.isRange(this.chunkRange.splice(0, 2), this.fileSize))
      return (this.chunckSize = 9 * this.unit)
    if (this.isRange(this.chunkRange.splice(1, 2), this.fileSize))
      return (this.chunckSize = 30 * this.unit)
    if (this.isRange(this.chunkRange.splice(2, 2), this.fileSize))
      return (this.chunckSize = 60 * this.unit)
    if (this.isRange(this.chunkRange.splice(3, 2), this.fileSize))
      return (this.chunckSize = 80 * this.unit)
    if (this.isRange(this.chunkRange.splice(4, 2), this.fileSize))
      return (this.chunckSize = 120 * this.unit)
    if (this.isRange(this.chunkRange.splice(5, 2), this.fileSize))
      return (this.chunckSize = 100 * this.unit)
    if (this.isRange(this.chunkRange.splice(6, 2), this.fileSize))
      return (this.chunckSize = 30 * this.unit)
    return (this.chunckSize = 200 * this.unit)
  }
}

export default Upload
