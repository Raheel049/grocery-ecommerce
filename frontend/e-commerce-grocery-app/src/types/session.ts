export interface Session {
    _id: string;

    device: string;

    browser: string;

    browserVersion: string;

    os: string;

    ip: string;

    lastActive: string;

    current: boolean;
}