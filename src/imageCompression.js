import imageCompression from 'browser-image-compression'

export default {
  async getCompressImageFile(file) {
    const options = {
      maxSizeMB: 0.8, //最大ファイルサイズ
      maxWidthOrHeight: 600, //最大縦横値
    }
    try {
      //圧縮した画像を生成
      return await imageCompression(file, options)
    } catch (error) {
      console.log('getCompressImageFile is error', error)
      throw error
    }
  },
}
