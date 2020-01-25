import { loadConsumer, Consumer } from '../../../consumer';
import { movePaths } from '../../../consumer/component-ops/move-components';
import { PathChangeResult } from '../../../consumer/bit-map/bit-map';

export default (async function move({ from, to }: { from: string; to: string }): Promise<PathChangeResult[]> {
  const consumer: Consumer = await loadConsumer();
  const moveResults = await movePaths(consumer, { from, to });
  await consumer.onDestroy();
  return moveResults;
});
