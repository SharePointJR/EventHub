declare interface IEventHubWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  EventHubFieldLabel: string;
  EventGroupFieldLabel: string;
  MeetingListFieldLabel: string;
}

declare module 'EventHubWebPartStrings' {
  const strings: IEventHubWebPartStrings;
  export = strings;
}
