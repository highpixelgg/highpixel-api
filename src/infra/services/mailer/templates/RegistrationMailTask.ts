export const RegistrationMailTask = (email: string, secretCode: string, fullName: string) => ({
  to: email,
  subject: "Ative seu cadastro no LowRacing",
  body: `Hey, ${fullName} Confirme seu e-mail clicando no link abaixo:
  
  http://localhost:10000/auth/recovery/${secretCode} 
  
  Low Racing - Copyright 2024
`
});