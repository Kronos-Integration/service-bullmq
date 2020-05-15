import { mergeAttributes, createAttributes } from "model-attributes";
import { Queue, Worker } from "bullmq";
import { QueueEndpoint } from "./queue-endpoint.mjs";

export class ServiceBullMQ extends Service {
  /**
   * @return {string} 'http'
   */
  static get name() {
    return "bullmq";
  }

  static get configurationAttributes() {
    return mergeAttributes(
      Service.configurationAttributes,
      createAttributes({
        url: {
          description: "public key to check token against",
          default: "redis://127.0.0.1:6379'",
          mandatory: true,
          type: "url"
        }
      })
    );
  }

  /**
   * on demand create QueueEndpoints
   * @param {string} name
   * @param {Object|string} definition
   * @return {Class} QueueEndpoints if name stats with queue.
   */
  endpointFactoryFromConfig(name, definition, ic) {
    if (name.startsWith("queue.")) {
      return QueueEndpoint;
    }

    return super.endpointFactoryFromConfig(name, definition, ic);
  }
}

export default ServiceBullMQ;
