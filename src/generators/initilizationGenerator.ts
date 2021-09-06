/*
 * Copyright (c) 2020, nCino, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';
import { SfdxGenerator } from '@salesforce/templates/lib/generators/sfdxGenerator';
import { TemplateOptions } from '@salesforce/templates/lib/utils/types';
import { CreateUtil } from '@salesforce/templates/lib/utils/createUtil';

interface InitilizationOptions extends TemplateOptions {
  foldername: string;
}

export default class InitilizationGenerator extends SfdxGenerator<InitilizationOptions> {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(args: string | string[], options: InitilizationOptions) {
    super(args, options);
    this.sourceRoot(path.join(__dirname, '..', 'templates', 'resources'));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public validateOptions() {
    CreateUtil.checkInputs(this.options.foldername);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public writing() {
    const { outputdir, foldername } = this.options;
    // eslint-disable-next-line no-unused-expressions
    this.fs.copyTpl(
      this.templatePath('scripts.js'),
      this.destinationPath(path.join(outputdir, foldername, 'assets', 'scripts.js'))
    ),
      this.fs.copyTpl(
        this.templatePath('styles.css'),
        this.destinationPath(path.join(outputdir, foldername, 'assets', 'styles.css'))
      );

    this.fs.append(this.destinationPath('.prettierignore'), 'docs/');
  }
}
