import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, interval, scan, startWith } from 'rxjs';

interface Data {
  name: string;
  city: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  arry = signal([{ name: 'Rohan', city: ' Junagadh' }]);
  arr: any | [];
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      name: '',
      city: '',
    });
  }

  dataSub: Subscription | any;

  onSubmit() {
    let Data = this.myForm.value;
    console.log(Data);

    let obj = {
      name: Data.name,
      city: Data.city,
    };
    this.arry.mutate((data) => {
      data.push(this.myForm.value);
    });
    const DataEmp = interval(1000).pipe(
      scan(
        (total: [] | any, n: {} | any) => [...total, this.arry()],
        this.arry()
      )
    );

    this.dataSub = DataEmp.subscribe((data) => {
      // console.log(this.arry());
      console.log(data);
      this.dataSub.unsubscribe();
      if (this.arry().length == 1) {
        console.log();
      } else {
      }
    });
  }

  ngOnInit() {}

  getData() {
    let data: Data = {
      name: 'Rohan',
      city: 'Bangalore',
    };
    return data;
  }

  onclick() {
    console.log(this.arr);
    this.arr.push(this.getData());
  }
}
