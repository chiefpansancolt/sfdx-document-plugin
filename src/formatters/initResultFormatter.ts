/*
 * Copyright (c) 2020, nCino, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { blue } from 'chalk';
import { UX } from '@salesforce/command';
import { Logger, Messages } from '@salesforce/core';
import { ResultFormatter } from './resultFormatter';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-document-plugin', 'web-init');

export interface InitResults {
  resources: FileResponse[];
}

export interface FileResponse {
  fullName: string;
  fileType: string;
  filePath: string;
  status: string;
}

export interface CommandResults {
  files: FileResponse[];
}

export class InitResultFormatter extends ResultFormatter {
  protected result: InitResults;

  public constructor(logger: Logger, ux: UX, result: InitResults) {
    super(logger, ux);
    this.result = result;
  }

  /**
   * Get the JSON output from the RetrieveResult.
   *
   * @returns CommandResults
   */
  public getJson(): CommandResults {
    return {
      files: this.result.resources,
    };
  }

  /**
   * Displays retrieve results in human format.
   */
  public display(): void {
    if (this.isSuccess()) {
      this.ux.styledHeader(blue(messages.getMessage('FilesCreated')));
      const retrievedFiles = this.result.resources.filter((fr) => fr.status === messages.getMessage('SuccessMessage'));
      if (retrievedFiles?.length) {
        this.displaySuccesses(retrievedFiles);
      } else {
        this.ux.log(messages.getMessage('NoResultsFound'));
      }
    } else {
      this.ux.styledHeader(blue(messages.getMessage('FilesErrored')));
      const retrievedFiles = this.result.resources.filter((fr) => fr.status !== messages.getMessage('SuccessMessage'));
      this.displayErrors(retrievedFiles);
    }
  }

  private displaySuccesses(clonedFiles: FileResponse[]): void {
    const columns = [
      { key: 'status', label: 'STATUS' },
      { key: 'fullName', label: 'FULL NAME' },
      { key: 'type', label: 'TYPE' },
      { key: 'filePath', label: 'PROJECT PATH' },
    ];
    this.ux.table(clonedFiles, { columns });
  }

  private displayErrors(clonedFiles: FileResponse[]): void {
    const columns = [
      { key: 'status', label: 'STATUS' },
      { key: 'fullName', label: 'FULL NAME' },
      { key: 'type', label: 'TYPE' },
      { key: 'filePath', label: 'PROJECT PATH' },
    ];
    this.ux.table(clonedFiles, { columns });
  }
}
