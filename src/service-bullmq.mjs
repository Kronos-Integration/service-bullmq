import { Service } from "@kronos-integration/service";
import { prepareAttributesDefinitions, url_attribute } from "pacc";
import { QueueEndpoint } from "./queue-endpoint.mjs";

export class ServiceBullMQ extends Service {
  /**
   * @return {string} 'bullmq'
   */
  static get name() {
    return "bullmq";
  }

  static attributes = prepareAttributesDefinitions(
    {
      url: {
        ...url_attribute,
        description: "bull connection",
        default: "redis://127.0.0.1:6379",
        mandatory: true
      }
    },
    Service.attributes
  );

  /**
   * On demand create QueueEndpoints
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
