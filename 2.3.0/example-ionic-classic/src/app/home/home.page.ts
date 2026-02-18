import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { fphi_str_activity_result_error, fphi_str_camera_error, fphi_str_camera_permission_denied, fphi_str_component_controller_application_error, fphi_str_component_controller_error, fphi_str_extractor_license_error, fphi_str_generic_bad_extractor_conf, fphi_str_generic_control_not_initialized, fphi_str_generic_extraction_license, fphi_str_generic_unexpected_captured, fphi_str_hardware_error, fphi_str_init_proccess_error, fphi_str_init_session_error, fphi_str_initialization_error, fphi_str_license_checker_error_invalid_component_license, fphi_str_license_checker_error_invalid_license, fphi_str_license_string_error, fphi_str_licensing_error_api_key_forbidden, fphi_str_licensing_error_app_id_invalid, fphi_str_licensing_error_license_not_found, fphi_str_licensing_error_package_name, fphi_str_network_connection, fphi_str_nfc_error, fphi_str_nfc_error_data, fphi_str_nfc_error_disabled, fphi_str_nfc_error_illegal_argument, fphi_str_nfc_error_not_supported, fphi_str_nfc_error_tag_lost, fphi_str_no_data_error, fphi_str_no_operation_created_error, fphi_str_permission_denied, fphi_str_phacturas_capture_error, fphi_str_phingers_autofocus_failure, fphi_str_phingers_camera_failure, fphi_str_phingers_capture_failure, fphi_str_phingers_configuration_failure, fphi_str_phingers_fingerprint_capture_failure, fphi_str_phingers_fingerprint_template_io_error, fphi_str_phingers_licensing_failure, fphi_str_phingers_liveness_failure, fphi_str_phingers_no_detected, fphi_str_phingers_unique_userid_not_specified, fphi_str_qr_capture_error, fphi_str_qr_generation_error, fphi_str_resourses_not_found, fphi_str_sdk_init_flow, fphi_str_sdk_not_initialized, fphi_str_settings_permission_denied, fphi_str_stopped_manually, fphi_str_timeout, fphi_str_token_error, fphi_str_tracking_error, fphi_str_unknown_error, fphi_str_video_error } from '../constants';
import { SdkErrorType, SdkFinishStatus } from '../services/core/core.service.enums';
import { SelphidService } from '../services/selphid/selphid.service';
import { SelphiService } from '../services/selphi-face/selphi.service';
import { CoreService } from '../services/core/core.service';
import { FacephiService } from '../api/api-rest/facephi.service';
import { Subscription } from 'rxjs';
import { CoreResult } from '../services/core/core.service.core.result';
import { SelphiFaceResult } from '../services/selphi-face/selphi.service.result';
import { SelphIDResult } from '../services/selphid/selphid.service.result';
import { LoadingController } from '@ionic/angular';

declare let facephi: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit
{
  // UriImage header for base64 images visualization.
  URI_JPEG_HEADER = 'data:image/jpeg;base64,';

  apiRest: FacephiService;
  selphiFaceService: SelphiService;
  selphidService: SelphidService;
  coreService: CoreService;

  message: string = '';
  bestImageCropped: string = "";
  bestImage: string = "";
  tokenFaceImage: string = "";
  isListExpanded: boolean = false;
  showError: boolean = false;
  frontDocumentImage: string = "";
  backDocumentImage: string = "";
  faceImage: string = "";
  ocrData = null;
  subscription!: Subscription;
  subscriptionTracking!: Subscription;

  constructor(
    selphidService: SelphidService, 
    selphiService: SelphiService,
    coreService: CoreService,
    apiRest: FacephiService,
    private changeDetection: ChangeDetectorRef,
    private loadingCtrl: LoadingController) 
  {  
    this.selphiFaceService = selphiService;
    this.selphidService = selphidService;
    this.coreService = coreService;
    this.apiRest = apiRest;
  }

  ngOnInit(): void 
  {
    this.initListeners();
  }

  initListeners(): void 
  {
    document.addEventListener('deviceready', () => 
    {
      facephi.plugins.sdkcore.startListeningTrackingEvents(
        (event: any) => console.log('Tracking:', event)
      );

      facephi.plugins.sdkcore.startListeningFlowEvents(
        (event: any) => console.log('Flow:', event)
      );
    });
  }

  safeJsonParse(data: any) 
  {
    if (typeof data !== 'string') {
      return data;
    }

    try {
      return JSON.parse(data);
    } catch (e1) {
      try {
        // Segundo intento (doble serialización)
        return JSON.parse(JSON.parse(data));
      } catch (e2) {
        console.error('❌ JSON inválido:', data);
        throw e2;
      }
    }
  }

  onLaunchFlow = async () => 
  {
    this.message = '';
    await this.coreService.initFlow()
    .then(async (result: CoreResult) => 
    {
      if (result.finishStatus == SdkFinishStatus.Ok)
      {
        await this.selphiFaceService.setSelphiFlow()
          .then((res: SelphiFaceResult) => console.log("setSelphiFlow res", res))
          .catch((err: any) => console.log("setSelphiFlow err", err));

        await this.selphidService.setSelphidFlow()
          .then((res: SelphIDResult) => console.log("setSelphidFlow res", res))
          .catch((err: any) => console.log("setSelphidFlow err", err));

        await this.coreService.startFlow()
          .then((res: CoreResult) => console.log("startFlow res", res))
          .catch((err) => console.log("startFlow err", err));
      }
    }, 
    (err: any) => console.log(err));
  }

  onInitSession = async () => 
  {
    this.message = '';

    console.log('initSession starts...');
    await this.coreService.initSession()
    .then((result: CoreResult) => console.log(result), (err: any) => console.log(err)).finally(() => console.log("initSession ends."));
  }

  onInitOperation = async () => {
    this.message = '';

    console.log('initOperation starts...');
    await this.coreService.initOperation()
    .then((result: CoreResult) => console.log(result), (err: any) => console.log(err)).finally(() => console.log("initOperation ends."));
  }

  onCloseSession = async () => {
    this.message = '';

    console.log("onCloseSession starts.")
    await this.coreService.closeSession()
    .then((result: CoreResult) => 
    {
      console.log(result)
    },
    (err: any) => console.log(err))
    .finally(() => 
    {
      if (typeof this.subscription !== 'undefined')
      {
        this.subscription.unsubscribe()
        this.subscriptionTracking.unsubscribe()
      }
    })
    .finally(() => console.log("onCloseSession ends."));
  }

  onGetExtraData = async () => 
  {
    this.message = '';
    let loading = await this.loadingCtrl.create({
      message: 'Requesting ...',
    });
    
    console.log('onGetExtraData starts...');
    await this.coreService.getExtraData()
    .then((result: CoreResult) => 
    {
      console.log(result);
      
      if (result.finishStatus == 1) 
      {
        if (this.bestImage !== "" &&  result.data !== "") 
        {
          /*this.apiRest.passiveLivenessEvaluate(result.data!, this.bestImage)
          .pipe(timeout(30000))
          .subscribe(
            (res: any) => {
              console.log("passiveLivenessEvaluate", res);
            },
            (err: any) => {
              console.log("passiveLivenessEvaluate err", err);
            }
          );*/

          loading.present();
          this.apiRest.passiveLivenessEvaluate(result.data!, this.bestImage)
          .then((res: any) => 
          { 
            console.log("passiveLivenessEvaluate", res); 
          })
          .catch((err: any) => 
          { 
            console.log("passiveLivenessEvaluate err", err); 
          })
          .finally(() => 
          {
            console.log("passiveLivenessEvaluate finally");
            loading.dismiss();
          });
        }

        if (this.bestImage !== "" &&  result.data !== "" &&  this.tokenFaceImage !== "") 
        {
          /*this.apiRest.authenticateFacialDocument(this.tokenFaceImage, result.data!, this.bestImage)        
          .pipe(timeout(30000))
          .subscribe({
            next: (res: any) => { console.log("authenticateFacialDocument", res); },   
            error: (err: any) => { console.log("authenticateFacialDocument", err); },
            complete: () => { console.log("authenticateFacialDocument completed..."); }
          });*/

          loading.present();
          this.apiRest.authenticateFacialDocument(this.tokenFaceImage, result.data!, this.bestImage)
          .then((res: any) => 
          { 
            console.log("authenticateFacialDocument", res); 
          })
          .catch((err: any) => 
          { 
            console.log("authenticateFacialDocument err", err); 
          })
          .finally(() => 
          {
            console.log("authenticateFacialDocument finally");
            loading.dismiss();
          });
        }
      }
    }, 
    (err: any) => console.log(err)).finally(() => console.log("onGetExtraDataEnd ends."));;
  }

  onLaunchSelphiProcess = async () => {
    console.log('onLaunchSelphiProcess starts...');
    this.message = '';
    await this.selphiFaceService.launchSelphiAuthentication()
    .then((result: SelphiFaceResult) => this.onSuccessSelphiExtraction(result), (err: string) => this.onErrorSelphiExtraction(err)).finally(() => (console.log("onLaunchSelphiProcess ends.")));
  }

  //  Formatting output
  onSuccessSelphiExtraction = (result: any) => {
    console.log('Receiving selphi success event...', result);
    if (result !== null && result) {
      switch (result.finishStatus) {
        case SdkFinishStatus.Ok: // OK
          this.processSuccessResult(result); // Logging the info for debug purposes
          this.bestImageCropped = this.URI_JPEG_HEADER + result.bestImageCropped;
          this.bestImage        = result.bestImage;
          this.showError        = false;
          //this.message        = 'Preview selfie';
          break;

        case SdkFinishStatus.Error: // Error
          this.onErrorSelphiExtraction(result);
          break;

        default:
          console.log('Receiving selphi plugin error event...', result);
          this.showError = true;
          this.message = 'An error has ocurred. Read the log for more info';
          break;
      }
      this.changeDetection.detectChanges();
    }
  }

  /** Method implemented only for debug purposes */
  processSuccessResult = (result: any) => {
    const message =
   `* FinishStatus: ' ${ result.finishStatus }
    * TypeError: ' ${ result.typeError }
    * TemplateRaw length: ' ${ result.templateRaw.length }
    * BestImage length: ' ${ result.bestImage.length }
    * BestImageCropped length: ' ${ result.bestImageCropped.length }
    * EyesGlassesScore: ' ${ result.eyeGlassesScore }
    * TemplateScore: ' ${ result.templateScore }`;
    console.log(message);
  }

  onErrorSelphiExtraction = (result: any) => 
  {
    console.log('SELPHI_ERROR:' + result);
    this.showError = true;
    //this.message   = SdkErrorType[result['errorType']];
    this.printError(result);
  }

  onLaunchSelphIDProcess = async () => {
    this.message = '';

    console.log("onLaunchSelphIDProcess starts.")
    await this.selphidService.launchSelphidCapture()
    .then(
      (result: SelphIDResult) => this.onSuccessSelphIDCapture(result), 
      (err: string) => this.onErrorSelphIDCapture(err)
    )
    .finally(() => (console.log("onLaunchSelphIDProcess ends.")));
  }

   //  Formatting output
  onSuccessSelphIDCapture = (result: any) => {
    console.log('Receiving selphID success event...', result);
    if (result !== null && result) {
      switch (result.finishStatus) 
      {
        case SdkFinishStatus.Ok: // OK
          //console.log("documentData", result.documentData);
          //console.log("documentData parsed", JSON.parse(result.documentData.replace(/\\/g, "")));
          this.processSuccessResultSelphID(result); // Logging the info for debug purposes
          this.tokenFaceImage     = result.tokenFaceImage;
          this.frontDocumentImage = this.URI_JPEG_HEADER + result.frontDocumentImage;
          this.backDocumentImage  = this.URI_JPEG_HEADER + result.backDocumentImage;
          this.faceImage          = (typeof result.faceImage === 'undefined' || result.faceImage === '') ? "./assets/images/image_no_available.png" : this.URI_JPEG_HEADER + result.faceImage;
          //this.ocrData          = JSON.parse(result.documentData.replace(/\\/g, ""));
          this.ocrData            = this.safeJsonParse(result.documentData);
          this.isListExpanded     = true;
          this.showError          = false;
          this.message            = 'Preview selfie';
          break;

        case SdkFinishStatus.Error: // Error
          console.log('SELPHID_ERROR:' + result);
          this.showError  = true;
          this.printError(result);

          break;

        default:
          console.log('Receiving selphid plugin error event...', result);
          this.showError  = true;
          this.message    = 'An error has ocurred. Read the log for more info';
          break;
      }
      this.changeDetection.detectChanges();
    }
  }

  /** Method implemented only for debug purposes */
  processSuccessResultSelphID = (result: any) => {
    const _message =
    `* FinishStatus: ' ${ result.finishStatus }
      * TypeError: ' ${ result.errorType }
      * TokenFaceImage length: ' ${ (typeof result.tokenFaceImage === 'undefined' || result.tokenFaceImage === '') ? 0 : result.tokenFaceImage.length }
      * TokenOCR length: ' ${ result.tokenOCR.length }
      * TokenDocumentFront length: ' ${ (typeof result.tokenBackDocumentImage === 'undefined' || result.tokenBackDocumentImage === '') ? 0 : result.tokenBackDocumentImage.length }
      * TokenDocumentBack length: ' ${ (typeof result.tokenFrontDocumentImage === 'undefined' || result.tokenFrontDocumentImage === '') ? 0 : result.tokenFrontDocumentImage.length }
      * MatchingSidesScore: ' ${ result.matchingSidesScore }`;
    //console.log(this.URI_JPEG_HEADER + result.faceImage, '');
    //console.log(_message);
  }

  onErrorSelphIDCapture = (data: any) => 
  {
    console.log('SELPHID_ERROR', data);
    this.showError  = true;
    this.message    = 'An error has ocurred. Read the log for more info';
  }

  private printError(data: any)
  {
    if (data['errorType'] === SdkErrorType.InitFlow) // Unknown Error
    {
      this.message = fphi_str_sdk_init_flow;
    }
    if (data['errorType'] === SdkErrorType.UnknownError) // Unknown Error
    {
      this.message = fphi_str_unknown_error;
    }
    if (data['errorType'] === SdkErrorType.CameraPermissionDenied) // Camera Permission Denied
    {
      this.message = fphi_str_camera_permission_denied;
    }
    if (data['errorType'] === SdkErrorType.SettingsPermissionDenied) // Settings Permission Denied
    {
      this.message = fphi_str_settings_permission_denied;
    }
    if (data['errorType'] === SdkErrorType.HardwareError) // Hardware error
    {
      this.message = fphi_str_hardware_error;
    }
    if (data['errorType'] === SdkErrorType.ExtractionLicenseError)
    {
      this.message = fphi_str_generic_extraction_license;
    }
    if (data['errorType'] === SdkErrorType.UnexpectedCaptureError)
    {
      this.message = fphi_str_generic_unexpected_captured;
    }
    if (data['errorType'] === SdkErrorType.ControlNotInitializedError)
    {
      this.message = fphi_str_generic_control_not_initialized;
    }
    if (data['errorType'] === SdkErrorType.BadExtractorConfiguration)
    {
      this.message = fphi_str_generic_bad_extractor_conf;
    }
    if (data['errorType'] === SdkErrorType.CancelByUser)
    {
      this.message = fphi_str_stopped_manually;
    }
    if (data['errorType'] === SdkErrorType.Timeout)
    {
      this.message = fphi_str_timeout;
    }
    if (data['errorType'] === SdkErrorType.InitProccessError)
    {
      this.message = fphi_str_init_proccess_error;
    }
    if (data['errorType'] === SdkErrorType.NfcError)
    {
      this.message = fphi_str_nfc_error;
    }
    if (data['errorType'] === SdkErrorType.NetworkConnection)
    {
      this.message = fphi_str_network_connection;
    }
    if (data['errorType'] === SdkErrorType.TokenError)
    {
      this.message = fphi_str_token_error;
    }
    if (data['errorType'] === SdkErrorType.InitSessionError)
    {
      this.message = fphi_str_init_session_error;
    }
    if (data['errorType'] === SdkErrorType.ComponentControllerError)
    {
      this.message = fphi_str_component_controller_error;
    }
    if (data['errorType'] === SdkErrorType.LicenseCheckerErrorInvalidLicense)
    {
      this.message = fphi_str_license_checker_error_invalid_license;
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorAppIdInvalid)
    {
      this.message = fphi_str_licensing_error_app_id_invalid;
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorApiKeyForbidden)
    {
      this.message = fphi_str_licensing_error_api_key_forbidden;
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorLicenseNotFound)
    {
      this.message = fphi_str_licensing_error_license_not_found;
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorPackageName)
    {
      this.message = fphi_str_licensing_error_package_name;
    }
    if (data['errorType'] === SdkErrorType.LicenseCheckerErrorInvalidComponentLicense)
    {
      this.message = fphi_str_license_checker_error_invalid_component_license;
    }
    if (data['errorType'] === SdkErrorType.ComponentControllerApplicationError)
    {
      this.message = fphi_str_component_controller_application_error;
    }
    if (data['errorType'] === SdkErrorType.NoOperationCreatedError)
    {
      this.message = fphi_str_no_operation_created_error;
    }
    if (data['errorType'] === SdkErrorType.LicenseStringError)
    {
      this.message = fphi_str_license_string_error;
    }
    if (data['errorType'] === SdkErrorType.SdkNotInitialized)
    {
      this.message = fphi_str_sdk_not_initialized;
    }
    if (data['errorType'] === SdkErrorType.TrackingError)
    {
      this.message = fphi_str_tracking_error;
    }
    if (data['errorType'] === SdkErrorType.ActivityResultError)
    {
      this.message = fphi_str_activity_result_error;
    }
    if (data['errorType'] === SdkErrorType.ExtractorLicenseError)
    {
      this.message = fphi_str_extractor_license_error;
    }
    if (data['errorType'] === SdkErrorType.InitializationError)
    {
      this.message = fphi_str_initialization_error;
    }
    if (data['errorType'] === SdkErrorType.ResourcesNotFound)
    {
      this.message = fphi_str_resourses_not_found;
    }
    if (data['errorType'] === SdkErrorType.NfcErrorDisabled)
    {
      this.message = fphi_str_nfc_error_disabled;
    }
    if (data['errorType'] === SdkErrorType.NfcErrorData)
    {
      this.message = fphi_str_nfc_error_data;
    }
    if (data['errorType'] === SdkErrorType.NfcErrorNotSupported)
    {
      this.message = fphi_str_nfc_error_not_supported;
    }
    if (data['errorType'] === SdkErrorType.NfcErrorTagLost)
    {
      this.message = fphi_str_nfc_error_tag_lost;
    }
    if (data['errorType'] === SdkErrorType.NfcErrorIllegalArgument)
    {
      this.message = fphi_str_nfc_error_illegal_argument;
    }
    if (data['errorType'] === SdkErrorType.QrCaptureError)
    {
      this.message = fphi_str_qr_capture_error;
    }
    if (data['errorType'] === SdkErrorType.CameraError)
    {
      this.message = fphi_str_camera_error;
    }
    if (data['errorType'] === SdkErrorType.PhacturasCaptureError)
    {
      this.message = fphi_str_phacturas_capture_error;
    }
    if (data['errorType'] === SdkErrorType.QrGenerationError)
    {
      this.message = fphi_str_qr_generation_error;
    }
    if (data['errorType'] === SdkErrorType.NoDataError)
    {
      this.message = fphi_str_no_data_error;
    }
    if (data['errorType'] === SdkErrorType.VideoError)
    {
      this.message = fphi_str_video_error;
    }
    if (data['errorType'] === SdkErrorType.PermissionDenied)
    {
      this.message = fphi_str_permission_denied;
    }
    if (data['errorType'] === SdkErrorType.PhingersAutofocusFailure)
    {
      this.message = fphi_str_phingers_autofocus_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersCaptureFailure)
    {
      this.message = fphi_str_phingers_capture_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersCameraFailure)
    {
      this.message = fphi_str_phingers_camera_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersFingerprintTemplateIoError)
    {
      this.message = fphi_str_phingers_fingerprint_template_io_error;
    }
    if (data['errorType'] === SdkErrorType.PhingersConfigurationFailure)
    {
      this.message = fphi_str_phingers_configuration_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersFingerprintCaptureFailure)
    {
      this.message = fphi_str_phingers_fingerprint_capture_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersLicensingFailure)
    {
      this.message = fphi_str_phingers_licensing_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersLivenessFailure)
    {
      this.message = fphi_str_phingers_liveness_failure;
    }
    if (data['errorType'] === SdkErrorType.PhingersNoFingersDetected)
    {
      this.message = fphi_str_phingers_no_detected;
    }
    if (data['errorType'] === SdkErrorType.PhingersUniqueUserIdNotSpecified)
    {
      this.message = fphi_str_phingers_unique_userid_not_specified;
    }
  }
}