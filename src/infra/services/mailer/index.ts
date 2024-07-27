import { emailService } from "./transporter";
import { RegistrationMailTask } from "./templates/RegistrationMailTask";
import { RecoveryMailTask } from "./templates/RecoveryMailTask";

export const sendRegistrationEmail = async (email: string, secretCode: string, fullName: string) => {
  const mailOptions = RegistrationMailTask(email, secretCode, fullName);
  await emailService.send(mailOptions);
};

export const sendRecoveryEmail = async (email: string, token: string, fullName: string) => {
  const mailOptions = RecoveryMailTask(email, token, fullName);
  await emailService.send(mailOptions);
};