// @ts-ignore
const context = require!.context("./", true, /\.ts$/);
const keys = context.keys().filter((item: string) => item !== "./index.ts");

export default keys.reduce((plugins: any, key: any) => {

    const type = key.split("/")[1];

    plugins[type] = context(key).default;

    return plugins;

}, Object.create(null));
