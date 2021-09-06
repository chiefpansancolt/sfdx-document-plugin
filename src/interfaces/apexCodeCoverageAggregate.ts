/*
 * Copyright (c) 2020, nCino, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default interface ApexCodeCoverageAggregate {
  ApexClassorTriggerId: string;
  NumLinesCovered: number;
  NumLinesUncovered: number;
}
