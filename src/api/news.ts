import axios from 'axios';

export interface COVID19NewsModel {
  abs: string;
  articleAbstract: string;
  authorId: number;
  authorName: string;
  contentId: number;
  gmtCreate: number;
  previewUrl: string;
  publishTime: number;
  pv: number;
  realPublishTime: string;
  title: string;
  url: string;
  [key: string]: any;
}

export const COVID19News = async (): Promise<COVID19NewsModel[]> => {
  const url =
    'https://cdn.mdeer.com/contentdtos.js?callback=callbackcontentdtos&t=1628318435956&_=1628318432739';
  const { data } = await axios.get(url);
  const result = data.slice(20, data.length - 1);
  return JSON.parse(result);
};

export default {};
