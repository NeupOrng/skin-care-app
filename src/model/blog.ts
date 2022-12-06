interface IBlog {
  Content: string,
  Id: number,
  Title: string,
  Tags: Array<string>,
  Date: string,
  Thumbnail: string
}

class Blog implements IBlog {
  Content: string;
  Title: string;
  Tags: Array<string>;
  Id: number;
  Date: string;
  Thumbnail: string;

  constructor (init: IBlog) {
    this.Content = init.Content
    this.Title = init.Title
    this.Tags = init.Tags
    this.Date = init.Date
    this.Thumbnail = init.Thumbnail
    this.Id = init.Id
  }
}

export {
  IBlog,
  Blog
}
