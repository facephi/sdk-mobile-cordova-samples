import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorResult } from './behavior.service.result';
import { BehaviorConfiguration } from './behavior.config';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class BehaviorService 
{
  constructor(public platform: Platform) { }       

  generateUUID = (): string => {
    return facephi.plugins.wgt.behavior.utils.generateUUID();
  };

  initializeRegisterField = (element: HTMLInputElement, fieldType: string): void => 
  {
    console.log("registerField starts...");
    facephi.plugins.wgt.behavior.registerField(element, fieldType);
  };

  initialize = async (value: BehaviorConfiguration): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.initialize(value);
  };

  checkInitialization = async (): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.checkInitialization();
  };

  setUserId = async (value: string): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setUserId(value);
  };

  setPosition = async (value: string): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setPosition(value);
  };

  setSessionId = async (value: string): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setSessionId(value);
  };

  clearSessionData = async (): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.clearSessionData();
  };

  setAutoLogoutAction = async (): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setAutoLogoutAction();
  };
}