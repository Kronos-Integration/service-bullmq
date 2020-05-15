import { SendEndpoint } from "@kronos-integration/endpoint";

/**
 * Endpoint to link against a bullmq queue
 */
export class QueueEndpoint extends SendEndpoint {
  /**
   * @param {string} name endpoint name
   * @param {Object} owner owner of the endpoint
   * @param {Object} options
   */
  constructor(name, owner, options = {}) {
    super(name, owner, options);
  }

}

