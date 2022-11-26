interface INavigationData {
  Text: string;
  HyperLink: string;
  Children?: Array<INavigationData>;
}

export default INavigationData
