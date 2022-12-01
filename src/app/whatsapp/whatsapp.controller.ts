import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Response,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import axios from 'axios';
import { MessageGateway } from 'src/message/message.gateway';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Fetch } from 'src/common/lib/Fetch';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';
// const axios = require('axios').default;

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    // private readonly messageGateway: MessageGateway,
    private readonly socketGateway: SocketGateway,
  ) {}

  // public api
  @Post('webhook')
  async webhookPost(@Request() req, @Response() res) {
    try {
      // Parse the request body from the POST
      const apiVersion = 'v15.0';
      const token =
        'EAAMBZBUByhEEBAEyL9h4jLGjSIsuIZAGkZB8zZBVbdhXQl2idGg8utUsbjZCBi0BZCk6a3QhcCsEB1apB5wlig56tH2nWU95qPlQ4RpRlIuVHg634hk20YYZCce9JqNmnZBKCh4VF1VyTgjrk3NRvvtRnfbFvzfEWne6pnIf9fk6IZCTns2YIUwcQZAAdMYYajzB0dDRXLnFMvqwZDZD';

      // Check the Incoming webhook message
      console.log(JSON.stringify(req.body, null, 2));

      // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
      if (req.body.object) {
        if (
          req.body.entry &&
          req.body.entry[0].changes &&
          req.body.entry[0].changes[0] &&
          req.body.entry[0].changes[0].value.messages &&
          req.body.entry[0].changes[0].value.messages[0]
        ) {
          const phone_number_id =
            req.body.entry[0].changes[0].value.metadata.phone_number_id;
          const from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          const msg_body =
            req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

          // set whatsapp credentials
          WhatsappApi.config({
            apiVersion: apiVersion,
            phoneNumberId: phone_number_id,
            token: token,
          });
          // send message back to user
          await WhatsappApi.sendText({ to: from, message: 'Ack: ' + msg_body });
          // emit message
          this.socketGateway.server.emit('message', {
            name: 'sikder',
            text: msg_body,
          });
        }
        res.sendStatus(200);
      } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
      }
    } catch (error) {
      throw error;
    }
  }

  // public api
  @Get('webhook')
  webhookGet(@Request() req, @Response() res) {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
     **/
    const verify_token = 'hello';

    // Parse params from the webhook verification request
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === verify_token) {
        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  }

  @Post()
  create(@Body() createWhatsappDto: CreateWhatsappDto) {
    return this.whatsappService.create(createWhatsappDto);
  }

  @Get()
  findAll() {
    return this.whatsappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWhatsappDto: UpdateWhatsappDto,
  ) {
    return this.whatsappService.update(+id, updateWhatsappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(+id);
  }
}
