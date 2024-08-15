export const RecoveryMailTask = (email: string, token: string, fullName: string) => ({
  to: email,
  subject: "Recuperação de conta",
  body: `Hey, ${fullName}, Você solicitou a recuperação de sua senha.
  
  http://localhost:10000/auth/recovery/${token} 
  Se você não solicitou esta recuperação, por favor ignore este e-mail.

  Low Racing - Copyright 2024
  `
});
