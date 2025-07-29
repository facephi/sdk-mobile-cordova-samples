import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SELPHID_RESOURCES_PATH } from './selphid.service.constants';
import { SelphIDDocumentSide, SelphIDDocumentType, SelphIDScanMode } from './selphid.service.enums';
import { SelphIDResult } from './selphid.service.result';
import { SelphIDConfiguration } from './selphid.service.configuration';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class SelphidService 
{
  constructor(public platform: Platform) { }

  /**
   * Method that launches the SelphID plugin with Search Mode.
   * @returns Promise with a JSON string.
   */
  launchSelphidCapture = async (): Promise<SelphIDResult> => 
  {
    return facephi.plugins.sdkselphid.launchSelphID(this.getSelphidSettings());
  }

  getSelphidSettings(): SelphIDConfiguration 
  {
    return {
      wizardMode: true,
      documentSide: SelphIDDocumentSide.Front,
      resourcesPath: SELPHID_RESOURCES_PATH,
      showResultAfterCapture: true,
      scanMode: SelphIDScanMode.Search,
      documentType: SelphIDDocumentType.IDCard,
      showTutorial: false,
      generateRawImages: true,
      specificData: `AR|<ALL>`
    };
  }

  setSelphidFlow = async (): Promise<SelphIDResult> => {
    console.log('Launching setSelphidFlow...');
    return facephi.plugins.sdkselphid.setSelphidFlow();
  }
}
