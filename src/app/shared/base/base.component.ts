import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiNameSpace } from 'src/app/model/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-base',
  template: '',
  styleUrls: []
})
export class BaseComponent<T extends any> implements OnInit {
  loading = true;
  paramsConfig:ApiNameSpace.Params = {
    url: '',
    params: {},
    body:{}
  }

  private _responseService: any;
  public get getResponseService(): any {
    return this._responseService;
  }
  public set setResponseService(value: any) {
    this._responseService = value;
  }

  constructor(
    protected readonly apiservice: ApiService<T>
  ){

  }
  ngOnInit(): void{}

  getRequest(): void{
    this.apiservice.getService(this.paramsConfig).subscribe({
      next: response => {
        this.setResponseService=response;
        this.loading = false;
      },
      error: () => {
        this.loading=false;
      },
      complete: () => {}
    });
  }

  postRequest(): void{
    this.apiservice.postService(this.paramsConfig).subscribe({
      next: response => {
        this.setResponseService=response;
        this.loading = false;
      },
      error: () => {
        this.loading=false;
      },
      complete: () => {}
    });
  }

  isFormInvalid(form: FormGroup): boolean {
    if(form.invalid){
      form.markAllAsTouched();
      for (const key in form.controls){
        form.controls[key].markAsDirty();
      }
      return true;
    }
    return false;
  }
}
