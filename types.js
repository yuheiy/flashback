// @flow

export type DiaryObjectType = {
  +id: string,
  +title: string,
  +body: string,
  +published: string,
  +cover: {
    +image: string,
    +width: number,
    +height: number,
    +alternateText: string,
    +caption: string,
  },
};
