import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import * as strings from 'EventHubWebPartStrings';
import EventHub from './components/EventHub/EventHub';
import { IEventHubProps } from './components/EventHub/IEventHubProps';

import { sp } from '@pnp/sp';
import EventInfo from './components/EventInfo/EventInfo';
//import times = require('lodash/times');

export interface IEventHubWebPartProps {
  description: string;
  listName: string;
  listItem: string;
  meetingListName: string;
}

export default class EventHubWebPart extends BaseClientSideWebPart<IEventHubWebPartProps> {

  private lists: IPropertyPaneDropdownOption[];
  private items: IPropertyPaneDropdownOption[];
  private listsDropDownDisabled: boolean = true;
  private itemsDropDownDisabled: boolean = true;

  protected onPropertyPaneConfigurationStart(): void {
    //disable the dropdowns if we don't have items for them
    this.listsDropDownDisabled = !this.lists;
    this.itemsDropDownDisabled = !this.items;

    // if the lists dropdown has items, then return
    if (this.lists) {
      return;
    }

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

    // get the lists for the current web, then the items if a list was selected
    this.getLists()
      .then(listsResp => {
        this.lists = listsResp;
        this.listsDropDownDisabled = false;
        this.context.propertyPane.refresh();
        return this.getItems();
      })
      .then(itemsResp => {
        this.items = itemsResp;
        this.itemsDropDownDisabled = !this.properties.listName;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });

  }

  // compare the old value with the newly selected value and get the new set of items if needed
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    if (propertyPath === 'listName' && newValue) {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      const previousItem: string = this.properties.listItem;
      this.properties.listItem = undefined;

      this.onPropertyPaneFieldChanged('listItem', previousItem, this.properties.listItem);
      this.itemsDropDownDisabled = true;

      this.getItems()
        .then(itemResp => {
          this.items = itemResp;
          this.itemsDropDownDisabled = false;
          this.render();
          this.context.propertyPane.refresh();

        });
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }


  public render(): void {
    console.log('rendering a new EventHub component...');
    const element: React.ReactElement<IEventHubProps > = React.createElement(
      EventHub,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        listItem: this.properties.listItem,
        meetingListName: this.properties.meetingListName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private getLists(): Promise<IPropertyPaneDropdownOption[]> {
    let options: IPropertyPaneDropdownOption[] = [];
    return new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void, reject) => {
           sp.web.lists.get().then(response => {
            response.forEach(lst => {
              if (lst.BaseTemplate == "100"){
                options.push({
                  key: lst.Title,
                  text: lst.Title
                });
              }
            });
          }).then( () => resolve(options) );
      }
    );
  }

  private getItems(): Promise<IPropertyPaneDropdownOption[]> {
    let options: IPropertyPaneDropdownOption[] = [];
    return new Promise<IPropertyPaneDropdownOption[]>( (resolve: (options: IPropertyPaneDropdownOption[]) => void, reject) => {
      
      if (this.properties.listName){
      sp.web.lists.getByTitle(this.properties.listName).items.get()
        .then(items => {
          items.forEach(item => {
            options.push({
              key: item.Id,
              text: item.Title
            });
          });
        }).then(() => resolve(options));
      }

    });
  }



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('listName', {
                  label: strings.EventHubFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropDownDisabled
                }),
                PropertyPaneDropdown('listItem', {
                  label: strings.EventGroupFieldLabel,
                  options: this.items,
                  disabled: this.itemsDropDownDisabled
                }),
                PropertyPaneDropdown('meetingListName', {
                  label: strings.MeetingListFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropDownDisabled
                })
              ]
            }

          ]
        }
      ]
    };
  }
  
}
