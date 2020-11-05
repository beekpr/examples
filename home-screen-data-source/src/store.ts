/**
 * This module stores strings in a folder named .store relative to this file
 */
import fs from 'fs';
import path from 'path';
import util from 'util';


const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

const FOLDER_NAME = '.store';
const ENCODING = 'utf8';

const pathToFolder = path.join(__dirname, FOLDER_NAME);
const pathToKey = (key: string) => path.join(pathToFolder, key);

export async function has(key: string): Promise<boolean> {
    return fs.existsSync(pathToKey(key));
}

export async function get(key: string): Promise<string> {
    return asyncReadFile(pathToKey(key), { encoding: ENCODING });
}

export async function set(key: string, value: string): Promise<void> {
    await asyncWriteFile(pathToKey(key), value, { encoding: ENCODING });
}

function setup() {
    if (!fs.existsSync(pathToFolder)) {
        fs.mkdirSync(pathToFolder);
    }
}

setup();
