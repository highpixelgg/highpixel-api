// import { emailService } from "./services/mailer/transporter";

// interface EmailData {
//   to: string;
//   subject: string;
//   body: string;
// }

// export default class Producer {
//   private exchange: string;

//   constructor(exchange: string) {
//     this.exchange = exchange;
//   }

//   async publish<T extends EmailData>(data: T) {
//     try {
//       await emailService.send({
//         to: data.to,
//         subject: data.subject,
//         body: data.body,
//       });
//       console.log(`Email enviado para ${data.to} com sucesso.`);
//     } catch (error) {
//       console.error(`Erro ao enviar email para ${data.to}:`, error);
//     }
//   }
// }
