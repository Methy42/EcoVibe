import * as SocketIO from "socket.io-client";
import { SocketPlayerLoginEvent, store } from "../store";

export interface ISocketOption {
    character?: string;
    name?: string;
    token?: string;
}

export interface SocketEvent<DataType> {
    type: string,
    data: DataType
}

export class Socket {
    constructor(option: ISocketOption) {
        if (option.character && option.name) {
            this.socket = SocketIO.io({
                query: { character: option.character, name: option.name }
            });
        } else if (option.token) {
            this.socket = SocketIO.io({ auth: { token: option.token } });
        } else {
            throw new Error("Socket constructor params error");
        }

        this.socket.on("message", (event: SocketEvent<any>) => {
            store.eventBus.dispatchEvent(new MessageEvent(event.type, {
                data: event.data
            }));
        });

        this.socket.on("disconnected", () => {
            console.log('disconnected');
        });

        store.eventBus.addEventListener(SocketPlayerLoginEvent, (event: any) => {
            store.token = event.data.token;
            store.playerId = event.data.player.id;
            store.playerName = event.data.player.name;
        });
    }

    socket!: SocketIO.Socket;
}