import { EventEmitter } from 'events';
import download from '../FRPUtil/download';
import fs from 'fs/promises';
import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { Readable } from 'stream';

interface Events {
    started: [];
    spawned: [];
    closed: [code: number | null];
    message: [message: string];
    error: [err: Error];
}

export default interface FRPBase {
    /**
     * Listen for events emitted from the instance of FRPBase
     */
    on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => any | void): this;
    /**
     * Listen for the first call of events emitted from the instance of FRPBase
     */
    once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => any | void): this;
    /**
     * Emit an event
    */
    emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean;
}

export default class FRPBase extends EventEmitter {
    private executableName: string;
    private binaryDir: string | undefined;
    private downloadPromise: Promise<void>;
    public id: number;
    public process: ChildProcessWithoutNullStreams | null;
    public stdout: Readable | null;

    constructor(executableName: string) {
        super();

        this.executableName = executableName;
        this.downloadPromise = this._download();
        this.id = Math.floor(Math.random() * 1000000);
        this.process = null;
        this.stdout = null;
    }

    private async _download() {
        this.binaryDir = await download();
    }

    async _writeConfig(conf: string) {
        await this.downloadPromise;
        await fs.writeFile(path.join(this.binaryDir as string, `tmp_conf_${this.id}.ini`), conf);
    }

    /**
     * Start the FRP instance
     */
    async start() {
        if (this.process) return;
        await this.downloadPromise;
        const args = [
            '-c',
            path.join(this.binaryDir as string, `tmp_conf_${this.id}.ini`)
        ];
        this.process = spawn(path.join(this.binaryDir as string, process.platform === 'win32' ? this.executableName + '.exe' : this.executableName), args);
        this.stdout = this.process.stdout;
        this.process.once('spawn', () => {
            this.emit('spawned');
        })
        this.process.once('close', (code) => {
            this.process = null;
            this.emit('closed', code);
        })
        this.stdout.on('data', (data) => {
            this.emit('message', data.toString().trim());
        })
        this.process.on('error', (err) => {
            this.emit('error', err);
        })
        this.emit('started');
    }

    /**
     * Stop the FRP instance
     */
    stop() {
        if (this.process) return this.process.kill();
        return false;
    }
};