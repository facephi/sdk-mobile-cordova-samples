import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CUSTOMER_ID, LICENSE_APIKEY_ANDROID, LICENSE_APIKEY_IOS, LICENSE_STRING_ANDROID, LICENSE_STRING_IOS, LICENSE_URL } from 'src/app/constants';
import { CoreResult } from './core.service.core.result';
import { InitSessionConfiguration } from './core.service.init.session.cfg';
import { InitFlowConfiguration } from './core.service.init.flow.cfg';
import { InitOperationConfiguration } from './core.service.init.operation.cfg';
import { SdkOperationType } from './core.service.enums';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class CoreService 
{
  constructor(public platform: Platform) { }       

  closeSession = async (): Promise<CoreResult> => {
    console.log('Launching closeSession...');

    return facephi.plugins.sdkcore.launchCloseSession();
  };

  initSession = async (): Promise<CoreResult> => 
  {
    //let pluginLicense: string = (this.platform.is('ios')) ? JSON.stringify(LICENSE_STRING_IOS) : JSON.stringify(LICENSE_STRING_ANDROID);
    let pluginLicenseApiKey: string = (this.platform.is('ios')) ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID;

    const widgetConfig: InitSessionConfiguration = {
      //license: pluginLicense,
      licenseUrl: LICENSE_URL,
      licenseApiKey: pluginLicenseApiKey,
      enableTracking: false
    };

    return facephi.plugins.sdkcore.launchInitSession(widgetConfig);
  };

  initOperation = async (): Promise<CoreResult> => 
  {
    const widgetConfig: InitOperationConfiguration = {
      customerId: 'ionic@facephi.com',
      type: SdkOperationType.Onboarding
    };

    return facephi.plugins.sdkcore.launchInitOperation(widgetConfig);
  };

  getExtraData = async (): Promise<CoreResult> => 
  {
    return facephi.plugins.sdkcore.launchGetExtraData();
  }

  initFlow = async (): Promise<CoreResult> => 
  {
    const widgetConfig: InitFlowConfiguration = {
      flow: "FLOW_B",
      customerId: CUSTOMER_ID
    };

    return facephi.plugins.sdkcore.launchInitFlow(widgetConfig);
  };

  startFlow = async (): Promise<CoreResult> => 
  {
    return facephi.plugins.sdkcore.launchStartFlow();
  };
}