class ImageUploader {
  async upload(file) {
    // return 'file';
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'yk6p3hti');
    const result = await fetch(
      'https://api.cloudinary.com/v1_1/du4w00gvm/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    return await result.json();
  }
}

export default ImageUploader;
