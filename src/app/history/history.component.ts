import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Convert } from '../convertisseur/convert';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() historyvals:Convert[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
