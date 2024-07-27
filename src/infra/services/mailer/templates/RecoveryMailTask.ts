export const RecoveryMailTask = (email: string, token: string, username: string) => ({
  to: email,
  subject: "Recuperação de conta",
  body: `Hey, ${username}, Você solicitou a recuperação de sua senha.
  
  http://localhost:10000/auth/recovery/${token} 
  Se você não solicitou esta recuperação, por favor ignore este e-mail.

  Low Racing - Copyright 2024
  `
});
