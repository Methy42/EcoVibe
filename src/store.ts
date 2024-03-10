import { Scene } from "./game/Scene";
import { Socket } from "./socket/Socket";

class Store {
    eventBus = new EventTarget();

    gameScene?: Scene;

    socket?: Socket;

    playerId?: number;

    playerName?: string;

    get token() {
        return localStorage.getItem('token') || '';
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }
}

export const store = new Store();

export const EnterPanelCharacterChangeEvent = 'EnterPanelCharacterChange';
export const SceneControlCharacterModelLoadProgressEvent = 'SceneControlCharacterModelLoadProgress';
export const SceneControlCharacterModelLoadCompleteEvent = 'SceneControlCharacterModelLoadComplete';
export const SocketErrorEvent = 'SocketError';
export const SocketPlayerLoginEvent = 'SocketPlayerLogin';