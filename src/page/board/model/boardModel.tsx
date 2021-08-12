export default interface BoardModel {
  id: number;
  writer: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  readCnt: number;
}
