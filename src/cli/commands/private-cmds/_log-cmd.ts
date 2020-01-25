import Command from '../../command';
import { fromBase64, unpackCommand, packCommand, buildCommandMessage } from '../../../utils';
import { scopeShow } from '../../../api/scope';
import { migrate } from '../../../api/consumer';
import logger from '../../../logger/logger';
import { checkVersionCompatibilityOnTheServer } from '../../../scope/network/check-version-compatibility';
import clientSupportCompressedCommand from '../../../utils/ssh/client-support-compressed-command';
import log from '../../../api/scope/lib/log';

let compressResponse;
// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class _Log extends Command {
  name = '_log <path> <args>';
  private = true;
  description = 'show component logs';
  alias = '';
  opts = [];

  action([path, args]: [string, string]): Promise<any> {
    const { payload, headers } = unpackCommand(args);
    compressResponse = clientSupportCompressedCommand(headers.version);
    checkVersionCompatibilityOnTheServer(headers.version);
    const scopePath = fromBase64(path);
    return migrate(scopePath, false).then(() => {
      return log(scopePath, payload);
    });
  }

  report(str: string): string {
    return packCommand(buildCommandMessage(str, undefined, compressResponse), true, compressResponse);
  }
}
