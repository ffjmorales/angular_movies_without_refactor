import { Component } from '@angular/core';
import { LoginNameSpace } from './model/login.model';
import { StorageNamespace } from './model/storage.model';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { BaseComponent } from './shared/base/base.component';
import { ConstantUri } from './utils/constantUri';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent<LoginNameSpace.Login> {

  override set setResponseService({ request_token } : LoginNameSpace.Login){
    this.storageService.setJsonValue(StorageNamespace.Storage.RequestToken, request_token);
  }

  constructor(
    protected readonly apiService: ApiService<LoginNameSpace.Login>,
    private readonly storageService: StorageService
  ){
    super(apiService);
    this.paramsConfig.url = ConstantUri.tokenNew;
    this.paramsConfig.params.api_key = ConstantUri.apiKey;
    this.getRequest();
  }

  title = 'warehouse-storage';
}
