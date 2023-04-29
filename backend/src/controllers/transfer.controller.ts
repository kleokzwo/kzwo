import { Controller, Post, Body } from '@nestjs/common';
import { TransferService } from 'src/services/transfer.service';

export interface TransferDto {
  senderAddress: string; // Bitcoin address of the sender
  privateKey: string; // Private key associated with the sender's Bitcoin address
  recipientAddress: string; // Bitcoin address of the recipient
  amount: number; // Amount of Bitcoin to send (in satoshis)
}

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) { }

  @Post()
  async transfer(@Body() transferData: TransferDto): Promise<any> {
    return this.transferService.sendBitcoin(transferData);
  }
}
