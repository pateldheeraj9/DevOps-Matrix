import { Component, EventEmitter, Input, Output  } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Message,MessageService,ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.css'],
  providers: [ConfirmationService]
})
export class ConfirmboxComponent {
  ToastMessages: Message[] | undefined;
  pos: any | undefined;
  @Input() label: string | undefined;



  @Output() onClick = new EventEmitter<any>();
$id: any;
$name: any;
  constructor(private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,private messageService: MessageService) {}

  onClickButton(event: any,id:any,name:any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.onClick.emit("delete");

          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (type: any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
  });

      this.onClick.emit("test");
    //this.onClick.emit(event);
  }


}
