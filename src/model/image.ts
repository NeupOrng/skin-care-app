interface IImage {
  id: number,
  'image_path': string,
  'created_at': string,
  'updated_at': string,
  'status_id': number
}

class ImageDto implements IImage {
  'id': number;
  'image_path': string;
  'created_at': string;
  'updated_at': string;
  'status_id': number;

  get 'image_path_for_display' (): string {
    return `${process.env.VUE_APP_ENDPOINT}/${this.image_path}`
  }

  constructor (init: IImage) {
    Object.assign(this, init)
  }
}

export {
  IImage,
  ImageDto
}
