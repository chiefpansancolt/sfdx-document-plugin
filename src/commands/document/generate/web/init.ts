/*
 * Copyright (c) 2020, nCino, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as os from 'os';
import * as path from 'path';
import { flags, SfdxCommand } from '@salesforce/command';
import { fs, Messages, SfdxProject } from '@salesforce/core';
import {
  InitResultFormatter,
  InitResults,
  FileResponse,
  CommandResults,
} from '../../../../formatters/initResultFormatter';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-document-plugin', 'web-init');

export default class Init extends SfdxCommand {
  public static description = messages.getMessage('description');
  public static examples = messages.getMessage('examples').split(os.EOL);

  protected static flagsConfig = {
    name: flags.string({
      default: 'docs',
      char: 'n',
      description: messages.getMessage('flags.name'),
    }),
  };

  protected static requiresProject = true;

  public async run(): Promise<CommandResults> {
    const projectPath = await SfdxProject.resolveProjectPath();
    const files: string[] = ['scripts.js', 'styles.css'];
    let results: InitResults;

    for (const file of files) {
      let response: FileResponse;
      const pathToFile = path.join(__dirname, 'templates', 'resources', file);
      const pathToNewDestination = path.join(projectPath, this.flags.name, 'assets', file);
      fs.copyFile(pathToFile, pathToNewDestination, function (err) {
        response.fullName = file.split('.')[0];
        response.fileType = file.split('.')[1];
        response.filePath = pathToNewDestination;
        if (err) {
          response.status = err.message;
        } else {
          response.status = messages.getMessage('SuccessMessage');
        }
      });
      results.resources.push(response);
    }

    const formatter = new InitResultFormatter(this.logger, this.ux, results);

    formatter.display();

    return formatter.getJson();
  }
}
