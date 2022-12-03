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
import { SocketGateway } from 'src/socket/socket.gateway';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    // private readonly messageGateway: MessageGateway,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Get('test')
  async test() {
    WhatsappApi.config({
      token:
        'EAAMBZBUByhEEBABgb6glvi4Cx7uQZAm5LOORszLWL1o0FAjVF5P9FY0c1OYxwY1DVIQjNxHFuNHt1aS7trBZA0SMub9MmdWmZBUXZAVMDYcItPoyOEtuH0SatJk4WHwW7H8LSy6aMdV5UTcvmnSRzZBMbd7LDvzlkzZCOSrBQc2d72ZCPz3K0ZB1Vd5St4MLiMrS4FiaJP4FfMgZDZD',
    });
    const data = await WhatsappApi.getPhoneNumberId('105708749047752');
    console.log(data);
    return 'done';
  }
  // public api
  @Post('webhook')
  async webhookPost(@Request() req, @Response() res) {
    try {
      // Parse the request body from the POST
      const token =
        'EAAMBZBUByhEEBAEyL9h4jLGjSIsuIZAGkZB8zZBVbdhXQl2idGg8utUsbjZCBi0BZCk6a3QhcCsEB1apB5wlig56tH2nWU95qPlQ4RpRlIuVHg634hk20YYZCce9JqNmnZBKCh4VF1VyTgjrk3NRvvtRnfbFvzfEWne6pnIf9fk6IZCTns2YIUwcQZAAdMYYajzB0dDRXLnFMvqwZDZD';

      // Check the Incoming webhook message
      // console.log(JSON.stringify(req.body, null, 2));

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
