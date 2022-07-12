import FRPBase from "./Base";
import { ServerConf } from "../Types/ServerConf";
import ini from 'ini';

class FRPServer extends FRPBase {
    /**
     * Create a new FRP server instance
     * @param {ServerConf} config The config for the instance
     */
    constructor(config?: ServerConf) {
        super('frps');
        
        if (config) this._writeConfig(ini.stringify(config));
    }

    setConfig(config: ServerConf) {
        this._writeConfig(ini.stringify(config));
    }

    setConfigRaw(rawConfig: string) {
        this._writeConfig(rawConfig);
    }
};

export default FRPServer;