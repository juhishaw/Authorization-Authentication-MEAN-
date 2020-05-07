export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
};
export const versions: TsAppVersion = {
    version: '0.0.1',
    name: 'command-center',
    versionDate: '2020-05-07T04:53:52.089Z',
    gitCommitHash: 'g776516c',
    gitCommitDate: '2020-05-07T04:16:19.000Z',
    versionLong: '0.0.1-g776516c',
    gitTag: 'v0.0.1',
};
export default versions;
