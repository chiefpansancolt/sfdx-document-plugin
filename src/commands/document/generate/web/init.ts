/*
 * Copyright (c) 2020, nCino, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as os from 'os';
import { AnyJson } from '@salesforce/ts-types';
import { flags } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { TemplateCommand } from '@salesforce/plugin-templates/lib/utils';
import InitilizationGenerator from '../../../../generators/initilizationGenerator';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-document-plugin', 'web-init');

export default class Init extends TemplateCommand {
  public static description = messages.getMessage('description');
  public static examples = messages.getMessage('examples').split(os.EOL);

  protected static flagsConfig = {
    foldername: flags.string({
      char: 'n',
      description: messages.getMessage('flags.name'),
      default: 'docs',
    }),
    outputdir: flags.string({
      char: 'd',
      description: messages.getMessage('flags.outputdir'),
      default: '.',
    }),
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    return this.runGenerator(InitilizationGenerator);
  }
}
