import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dropbox, DropboxAuth } from 'dropbox';
import { FileUpload } from 'graphql-upload';
import { FileDownload } from './entities/dropbox.entity';

@Injectable()
export class DropboxService {
  private redirectUri = `http://${this.configService.get('BASE_DOMAIN')}:${this.configService.get('PORT')}/graphql`;

  private dbxAuth: DropboxAuth;
  private dbx: () => Dropbox;

  constructor(private configService: ConfigService) {
    this.dbxAuth = new DropboxAuth({
      clientId: this.configService.get('DROPBOX_KEY'),
      clientSecret: this.configService.get('DROPBOX_SECRET'),
      refreshToken: this.configService.get('DROPBOX_RESRESH_TOKEN'),
    });

    this.dbx = () =>
      new Dropbox({
        accessToken: this.dbxAuth.getAccessToken(),
        refreshToken: this.configService.get('DROPBOX_RESRESH_TOKEN'),
      });
  }

  async getAuthenticationUrl() {
    const url = await this.dbxAuth.getAuthenticationUrl(
      this.redirectUri,
      null,
      'code',
      'offline',
      null,
      'none',
      false,
    );

    return url;
  }

  async refreshAccessToken() {
    await this.dbxAuth.refreshAccessToken(
      this.configService.get('DROPBOX_SCOPE').split(' '),
    );
    const token = await this.dbxAuth.getAccessToken();

    return token;
  }

  async temporaryLink(id: string) {
    await this.dbxAuth.checkAndRefreshAccessToken();
    const result = await this.dbx().filesGetTemporaryLink({ path: id });
    return result;
  }

  async fileDownload(id: string) {
    const data = await this.dbx().filesDownload({ path: id });

    //eslint-disable-next-line
    const fileContent: Buffer = (<any>data).result.fileBinary;

    return 'data:image/jpeg;base64,' + fileContent.toString('base64');
  }

  async filesDownload(arrId: string[]): Promise<FileDownload[]> {
    try {
      await this.dbxAuth.checkAndRefreshAccessToken();

      const filePromises = arrId.map(async id => this.dbx().filesDownload({ path: id }));

      const fileContents = await Promise.all(filePromises);

      const result = fileContents.map(file => {
        //eslint-disable-next-line
        const fileContent: Buffer = (<any>file).result.fileBinary;

        return {
          file: 'data:image/jpeg;base64,' + fileContent.toString('base64'),
          id: file.result.id,
        };
      });

      return result;
    } catch (error) {
      if (error.status === 401) {
        await this.refreshAccessToken();
      }
    }
  }

  async uploadAvatar(id: string, file: FileUpload) {
    try {
      await this.dbxAuth.checkAndRefreshAccessToken();
      const { filename, createReadStream } = await file;

      const stream = createReadStream();
      const {
        result: { id },
      } = await this.dbx().filesUpload({
        path: '/avatar/' + filename,
        contents: stream,
      });

      return { id, error: '' };
    } catch (error) {
      return { id: null, error: error.message };
    }
  }

  async uploadItem(id: string, file: FileUpload) {
    try {
      await this.dbxAuth.checkAndRefreshAccessToken();
      const { filename, createReadStream } = await file;
      const stream = createReadStream();
      const {
        result: { id },
      } = await this.dbx().filesUpload({
        path: '/item/' + filename,
        contents: stream,
      });

      return { id, error: '' };
    } catch (error) {
      return { id: null, error: error.message };
    }
  }
}
