import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SELPHI_RESOURCES_PATH } from './selphi.service.constants';
import { SelphiFaceResult } from './selphi.service.result';
import { SelphiFaceConfiguration } from './selphi.service.configuration';
import { SelphiFaceLivenessMode } from './selphi.service.enums';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class SelphiService {

  constructor(public platform: Platform) { }

  /**
   * Method that launches the plugin using the authentication with liveness passive mode.
   * @param debug  Comment for parameter ´debug´.
   * @param livenessMode  Comment for parameter ´livenessMode´.
   * @param resourcesPath  Comment for parameter ´resourcesPath´.
   * @returns Promise with a JSON string.
   */
  launchSelphiAuthentication = async (): Promise<SelphiFaceResult> => 
  {
    // SelphiFaceConfiguration
    return facephi.plugins.sdkselphi.launchSelphi(this.setSelphiConfiguration());
  }

  private setSelphiConfiguration(): SelphiFaceConfiguration 
  {
    return {
      debug: false,
      livenessMode: SelphiFaceLivenessMode.Passive,
      resourcesPath: SELPHI_RESOURCES_PATH,
      enableGenerateTemplateRaw: true
    };
  }

  setSelphiFlow = async (): Promise<SelphiFaceResult> => {
    return facephi.plugins.sdkselphi.setSelphiFlow();
  }
}