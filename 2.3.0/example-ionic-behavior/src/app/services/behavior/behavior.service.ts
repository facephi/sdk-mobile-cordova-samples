import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorResult } from './behavior.service.result';
import { BehaviorConfiguration } from './behavior.config';
import { LICENSE_APIKEY_ANDROID, LICENSE_APIKEY_IOS } from '../../constants';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  sessionId = '';
  userId = '';

  constructor(public platform: Platform) {}

  generateUUID = (): string => {
    return facephi.plugins.wgt.behavior.utils.generateUUID();
  };

  initializeRegisterField = (element: HTMLInputElement, fieldType: string): void => {
    facephi.plugins.wgt.behavior.registerField(element, fieldType);
  };

  initialize = async (): Promise<BehaviorResult> => {
    const licenseKey = this.platform.is('ios') ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID;
    const widgetConfig: BehaviorConfiguration = {
      licenseKey,
      enableSupportLogs: true
    };
    return facephi.plugins.wgt.behavior.initialize(widgetConfig);
  };

  destroy = async (): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.destroy();
  };

  checkInitialization = async (): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.checkInitialization();
  };

  setUserId = async (userId: string): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.setUserId(userId);
  };

  setPosition = async (position: string): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.setPosition(position);
  };

  setSessionId = async (sessionId: string): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.setSessionId(sessionId);
  };

  clearSessionData = async (): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.clearSessionData();
  };

  setAutoLogoutAction = async (): Promise<BehaviorResult> => {
    return facephi.plugins.wgt.behavior.setAutoLogoutAction();
  };

  addEventsListener = (callback: (response: any) => void): void => {
    facephi.plugins.wgt.behavior.startListeningBehaviorEvents(
      callback,
      (err: any) => console.error('WGT_BEHAVIOR_EVENTS error', err)
    );
  };
}
