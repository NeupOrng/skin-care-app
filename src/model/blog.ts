import { IImage, ImageDto } from './image'

interface IBlog {
  'id': number,
  'title': string,
  'subtitle': string,
  'description': string,
  'created_at': string,
  'updated_at': string,
  'status_id': number,
  'blog_image': Array<IImage>
}

class Blog implements IBlog {
  'id': number;
  'title': string;
  'subtitle': string;
  'description': string;
  'created_at': string;
  'updated_at': string;
  'status_id': number;
  'blog_image': Array<ImageDto>;

  constructor (init: IBlog) {
    Object.assign(this, init)
    this.blog_image = init.blog_image.map((item) => new ImageDto(item))
  }
}

export {
  IBlog,
  Blog
}
