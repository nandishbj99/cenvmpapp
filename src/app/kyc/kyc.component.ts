import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormBuilder,FormGroup,NgForm } from "@angular/forms";

import { AuthService } from '../auth.service';
import {FileService} from '../file.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KYCComponent implements OnInit {

  submitted = false;
  private fileName;


  panDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,public authService: AuthService,private fileService: FileService) { }

  ngOnInit() {
    this.panDetailsForm = this.formBuilder.group({
      pannumber: ['', Validators.required],
      panname: ['', Validators.required],
      dateofbirth:['',Validators.required]
      //file: new FormControl(null, {validators:[Validators.required]})

  });
}
FinalformData: FormData;
Pickedpdf(event: Event){
  const reader = new FileReader();

  if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
    this.fileName = (event.target as HTMLInputElement).files[0].name;
    const file = (event.target as HTMLInputElement).files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.panDetailsForm.patchValue({
        file: reader.result
      });
    };
  }

  /*const file = (event.target as HTMLInputElement).files[0];
  this.panDetailsForm.patchValue({pdf: file});  */

  /*
    this.panDetailsForm.get('pdf').setValue(file);
    const file = (event.target as HTMLInputElement).files[0];
    this.panDetailsForm.patchValue({pdf: file});
    this.FinalformData = new FormData();
    this.FinalformData.append('file', file, file.name);
*/


}
get f() { return this.panDetailsForm.controls; }



  onSubmit(){
    this.submitted = true;
    if (this.panDetailsForm.invalid) {
      return;
  }

  //const formData = new FormData();
  //formData.append('file', this.panDetailsForm.get('pdf').value);
  //this.fileService.upload(this.fileName, this.panDetailsForm.get('file').value);
  let resource = JSON.stringify(this.panDetailsForm.value);
  this.authService.panupload(resource).subscribe((res) => {
    alert(res);
    console.log(res);
  })



    //alert("success");
    }

}
