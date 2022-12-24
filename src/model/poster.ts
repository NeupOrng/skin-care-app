import { IImage, ImageDto } from './image'

interface IPoster {
  'id': number,
  'description': string,
  'created_at': string,
  'updated_at': string,
  'status_id': number,
  'poster_image': Array<IImage>
}

class Poster implements IPoster {
  'id': number;
  'description': string;
  'created_at': string;
  'updated_at': string;
  'status_id': number;
  'poster_image': Array<ImageDto>;

  constructor (init: IPoster) {
    Object.assign(this, init)
    this.poster_image = init.poster_image.map((item) => new ImageDto(item))
  }
}

export {
  IPoster,
  Poster
}
