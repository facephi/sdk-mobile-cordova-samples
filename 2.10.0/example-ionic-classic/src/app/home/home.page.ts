import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SdkErrorType, SdkFinishStatus } from '../services/core/core.service.enums';
import { SelphidService } from '../services/selphid/selphid.service';
import { SelphiService } from '../services/selphi-face/selphi.service';
import { CoreService } from '../services/core/core.service';
import { FacephiService } from '../api/api-rest/facephi.service';
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

  selphiResult?: SelphiFaceResult | null  = null;
  selphidResult?: SelphIDResult | null    = null;
  message: string                         = "";
  showError: boolean                      = false;
  isDocumentDataSheetOpen: boolean        = false;

  constructor(
    coreService: CoreService,
    selphidService: SelphidService, 
    selphiService: SelphiService,
    apiRest: FacephiService,
    private changeDetection: ChangeDetectorRef,
    private loadingCtrl: LoadingController) 
  {  
    this.coreService        = coreService;
    this.selphiFaceService  = selphiService;
    this.selphidService     = selphidService;
    this.apiRest            = apiRest;
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

    console.log("onInitSession starts...");
    await this.coreService.initSession()
    .then(
      (result: CoreResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("onInitSession ends."));
  }

  onInitOperation = async () => {
    this.message = '';

    console.log("onInitOperation starts...");
    await this.coreService.initOperation()
    .then(
      (result: CoreResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("onInitOperation ends."));
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
      console.log("onCloseSession ends.");
    });
  }

  onGetExtraData = async () => 
  {
    this.message = '';
    let loading = await this.loadingCtrl.create({
      message: 'Requesting ...',
    });

    console.log("onGetExtraData starts...");
    await this.coreService.getExtraData()
    .then((result: CoreResult) => 
    {
      console.log(result);
      
      if (result.finishStatus == 1) 
      {
        if (this.selphiResult?.bestImage !== null &&  result.data !== "") 
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
          this.apiRest.passiveLivenessEvaluate(result.data!, this.selphiResult?.bestImage!)
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

        if (this.selphiResult !== null &&  result.data !== "" &&  this.selphiResult?.tokenFaceImage !== null) 
        {
          /*this.apiRest.authenticateFacialDocument(this.tokenFaceImage, result.data!, this.bestImage)        
          .pipe(timeout(30000))
          .subscribe({
            next: (res: any) => { console.log("authenticateFacialDocument", res); },   
            error: (err: any) => { console.log("authenticateFacialDocument", err); },
            complete: () => { console.log("authenticateFacialDocument completed..."); }
          });*/

          loading.present();
          this.apiRest.authenticateFacialDocument(this.selphiResult?.tokenFaceImage!, result.data!, this.selphiResult?.bestImage!)
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
    (err: any) => console.log(err)).finally(() => console.log("onGetExtraData ends."));
  }

  onLaunchSelphiProcess = async () => {
    console.log('onLaunchSelphiProcess starts...');
    this.message = '';
    await this.selphiFaceService.launchSelphiAuthentication()
    .then(
      (result: SelphiFaceResult) => this.onSuccessSelphiExtraction(result), 
      (err: string) => this.onErrorSelphiExtraction(err)
    )
    .finally(() => (console.log("onLaunchSelphiProcess ends.")));
  }

  //  Formatting output
  onSuccessSelphiExtraction = (result: SelphiFaceResult) => {
    console.log('Receiving selphi success event...', result);
    if (result !== null && result) {
      switch (result.finishStatus) {
        case SdkFinishStatus.Ok: // OK
          this.processSelphiSuccessResult(result); // Logging the info for debug purposes
          this.selphiResult                   = result;
          this.selphiResult!.bestImageCropped = this.URI_JPEG_HEADER + result.bestImageCropped!;
          this.showError                      = false;
          //this.message                      = 'Preview selfie';
          break;

        case SdkFinishStatus.Error: // Error
          this.onErrorSelphiExtraction(result);
          break;

        default:
          console.log('Receiving selphi plugin error event...', result);
          this.showError  = true;
          this.message    = 'An error has ocurred. Read the log for more info';
          break;
      }
      this.changeDetection.detectChanges();
    }
  }

  /** Method implemented only for debug purposes */
  processSelphiSuccessResult = (result: SelphiFaceResult) => {
    const message =
   `* FinishStatus: ' ${ result.finishStatus }
    * errorType: ' ${ result.errorType }
    * TemplateRaw length: ' ${ result.templateRaw!.length }
    * BestImage length: ' ${ result.bestImage!.length }
    * BestImageCropped length: ' ${ result.bestImageCropped!.length }`;
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

  openDocumentDataSheet = () => {
    if (!this.selphidResult?.documentData) {
      return;
    }
    this.isDocumentDataSheetOpen = true;
  }

  closeDocumentDataSheet = () => {
    this.isDocumentDataSheetOpen = false;
  }

   //  Formatting output
  onSuccessSelphIDCapture = (result: SelphIDResult) => {
    console.log('Receiving selphID success event...', result);
    if (result !== null && result) {
      switch (result.finishStatus) 
      {
        case SdkFinishStatus.Ok: // OK
          //console.log("documentData", result.documentData);
          //console.log("documentData parsed", JSON.parse(result.documentData.replace(/\\/g, "")));
          this.processSuccessResultSelphID(result); // Logging the info for debug purposes
          this.selphidResult                    = result;
          this.selphidResult.frontDocumentImage = this.URI_JPEG_HEADER + result.frontDocumentImage;
          this.selphidResult.backDocumentImage  = this.URI_JPEG_HEADER + result.backDocumentImage;
          this.selphidResult.faceImage          = (typeof result.faceImage === 'undefined' || result.faceImage === '') ? "./assets/images/image_no_available.png" : this.URI_JPEG_HEADER + result.faceImage;
          this.selphidResult.documentData       = this.safeJsonParse(result.documentData);
          this.showError                        = false;
          this.message                          = 'Preview selfie';
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
  processSuccessResultSelphID = (result: SelphIDResult) => {
    const _message =
    `* FinishStatus: ' ${ result.finishStatus }
      * TypeError: ' ${ result.errorType }
      * TokenFaceImage length: ' ${ (typeof result.tokenFaceImage === 'undefined' || result.tokenFaceImage === '') ? 0 : result.tokenFaceImage.length }
      * TokenOCR length: ' ${ result.tokenOCR!.length }
      * TokenDocumentFront length: ' ${ (typeof result.tokenBackDocument === 'undefined' || result.tokenBackDocument === '') ? 0 : result.tokenBackDocument.length }
      * TokenDocumentBack length: ' ${ (typeof result.tokenFrontDocument === 'undefined' || result.tokenFrontDocument === '') ? 0 : result.tokenFrontDocument.length }
      * MatchingSidesScore: ' ${ result.matchingSidesScore }`;
    //console.log(this.URI_JPEG_HEADER + result.faceImage, '');
    //console.log(_message);
  }

  onErrorSelphIDCapture = (result: any) => 
  {
    console.log('SELPHID_ERROR', result);
    this.showError  = true;
    this.message    = 'An error has ocurred. Read the log for more info';
  }

  private printError(data: any)
  {
    this.message = data['errorType'].replace(/_/g, ' ');
  }
}