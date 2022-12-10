import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Get('test')
  async test() {
    WhatsappApi.config({
      phoneNumberId: process.env.PHONE_NUMBER_ID,
      accountId: process.env.ACCOUNT_ID,
      token: process.env.TOKEN,
    });
    try {
      // const send = await WhatsappApi.getPhoneNumberIds();
      // send single products

      // const send = await WhatsappApi.sendSingleProduct({
      //   to: '8801833962595',
      //   catalog_id: '1188420285405731',
      //   product_retailer_id: '8qhne30rmj',
      //   bodyText:
      //     'Handpicked, locally sourced fruits that are cold-pressed for maximum flavour. Natural ingredients. No Added Preservatives.',
      //   footerText: 'Same Day Delivery in Bengalur',
      // });
      // send multiple products
      // const send = await WhatsappApi.sendMultipleProduct({
      //   to: '8801833962595',
      //   catalog_id: '1188420285405731',
      //   sections: [
      //     {
      //       title: 'Fresh Juices',
      //       product_items: [
      //         {
      //           product_retailer_id: '8qhne30rmj',
      //         },
      //         {
      //           product_retailer_id: 'qs22ilbax0',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Fresh Juices 2',
      //       product_items: [
      //         {
      //           product_retailer_id: '8qhne30rmj',
      //         },
      //         {
      //           product_retailer_id: 'qs22ilbax0',
      //         },
      //       ],
      //     },
      //   ],
      //   bodyText:
      //     'Handpicked, locally sourced fruits that are cold-pressed for maximum flavour. Natural ingredients. No Added Preservatives.',
      //   footerText: 'Same Day Delivery in Bengaluru',
      //   headerText: 'View Beverages',
      // });

      // send interactive
      // const send = await WhatsappApi.sendButtonMessage({
      //   to: '8801833962595',
      //   headerText: 'header',
      //   bodyText:
      //     'Handpicked, locally sourced fruits that are cold-pressed for maximum flavour. Natural ingredients. No Added Preservatives.',
      //   footerText: 'Same Day Delivery in Bengalur',
      //   buttons: [
      //     {
      //       type: 'reply',
      //       reply: {
      //         id: 'one-id',
      //         title: 'hello world',
      //       },
      //     },
      //   ],
      // });

      // const send = await WhatsappApi.sendListMessage({
      //   to: '8801833962595',
      //   headerText: 'header',
      //   bodyText:
      //     'Handpicked, locally sourced fruits that are cold-pressed for maximum flavour. Natural ingredients. No Added Preservatives.',
      //   footerText: 'Same Day Delivery in Bengalur',
      //   buttonText: 'Click to send',
      //   sections: [
      //     {
      //       title: 'section 1',
      //       rows: [
      //         {
      //           id: 'one',
      //           title: 'title one',
      //           description: 'this is description',
      //         },
      //       ],
      //     },
      //   ],
      // });

      // get business profile details
      // const send = await WhatsappApi.getBusinessProfileDeatils();
      // update business profile details
      // const send = await WhatsappApi.updateBusinessProfileDeatils({
      //   about: 'Healthcity is good company',
      //   // address: 'dhaka bangladesh',
      //   // description: 'Get you health treatment',
      //   // email: 'healthcitybd.com.bd@gmail.com',
      //   // websites: ['http://healthcitybd.com/', 'http://healthcitybd.com/app'],
      //   // vertical: 'HEALTH',
      // });

      // get message templates
      // const send = await WhatsappApi.getMessageTemplates();
      // create message template
      // const send = await WhatsappApi.createMessageTemplate({
      //   category: 'MARKETING',
      //   components: [
      //     {
      //       type: 'BODY',
      //       text: 'message-text',
      //     },
      //   ],
      //   name: 'hello_world_template_2',
      //   language: 'en_US',
      // });
      // delete message template
      // const send = await WhatsappApi.deleteMessageTemplate(
      //   'hello_world_template_2',
      // );
      // create message template
      // const send = await WhatsappApi.createMessageTemplate({
      //   category: 'MARKETING',
      //   components: [
      //     WhatsappApi.component().template.headerText('body'),
      //     WhatsappApi.component().template.bodyText('body'),
      //     WhatsappApi.component().template.footerText('footer-text'),
      //   ],
      //   name: 'hello_world_template_2',
      //   language: 'en_US',
      // });

      // console.log(send);
      return 'done';
    } catch (error) {
      console.log(error.response.data);

      throw error;
    }
  }

  // public api
  @Post('webhook/:webhook_key')
  async webhookPost(@Request() req, @Response() res) {
    try {
      const webhook_key = req.params.webhook_key;
      // Parse the request body from the POST
      const workspaceChannel = await this.whatsappService.findOne(webhook_key);
      let token = null;
      if (workspaceChannel) {
        token = workspaceChannel.access_token;
      } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
      }

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

          const contactName =
            req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the message text from the webhook payload

          // process whatsapp service
          const isProcessed = await this.whatsappService.processWhatsapp({
            phone_number_id: phone_number_id,
            token: token,
            contactName: contactName,
            from: from,
          });

          if (isProcessed) {
            // emit message
            this.socketGateway.server.emit('message', {
              name: 'sikder',
              text: msg_body,
            });
          }
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
  @Get('webhook/:webhook_key')
  async webhookGet(@Request() req, @Response() res) {
    try {
      const webhook_key = req.params.webhook_key;
      const workspaceChannel = await this.whatsappService.findOne(webhook_key);
      /**
       * UPDATE YOUR VERIFY TOKEN
       *This will be the Verify Token value when you set up webhook
       **/
      let verify_token = null;
      if (workspaceChannel) {
        verify_token = workspaceChannel.verify_token;
      } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
      }

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
          await this.whatsappService.verify_whatsapp(webhook_key);
          res.status(200).send(challenge);
        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          res.sendStatus(403);
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
