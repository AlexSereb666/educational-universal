import {Injectable} from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASSWORD'),
            },
            logger: true,
            debug: true
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: this.configService.get<string>('SMTP_USER'),
            to,
            subject: `Активация аккаунта на ${this.configService.get<string>('URL_FRONTEND')}`,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}
