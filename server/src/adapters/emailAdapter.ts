export interface SendMailData{
    subject:string,
    body:string
}

export interface EmailAdapter{
    SendMail:(data:SendMailData) => Promise<void> ;
} 