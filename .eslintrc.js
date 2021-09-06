/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
module.exports = {
  extends: ['eslint-config-salesforce-typescript', 'eslint-config-salesforce-license'],
  rules: {
    'header/header': [
      2,
      'block',
      [
        '',
        {
          pattern: ' \\* Copyright \\(c\\) \\d{4}, nCino, inc\\.',
          template: ' * Copyright (c) 2020, nCino, inc.',
        },
        ' * All rights reserved.',
        ' * Licensed under the BSD 3-Clause license.',
        ' * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause',
        ' ',
      ],
    ],
  },
};
