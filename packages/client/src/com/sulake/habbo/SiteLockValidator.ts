import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { LocalConnection } from '@habbo-pixi/runtime/net/LocalConnection';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { RC4Cipher } from '@/com/sulake/habbo/RC4Cipher';

const encryptedDomainData_binAsset = embedBytes("sitelock/encryptedDomainData.bin");
const encryptionKey_binAsset = embedBytes("sitelock/encryptionKey.bin");

export class SiteLockValidator {
    static { registerClassName(this, 'SiteLockValidator'); }

    private encryptedDomainData = encryptedDomainData_binAsset;

    private encryptionKey = encryptionKey_binAsset;

    public validateDomain(sprite: Sprite): boolean {
        let allowLocalhost: boolean = false;
        let allowAll: boolean = false;
        let entry: string = null;
        let urlPrefixes: any[] = [];
        let domainPattern: string = "";
        let loaderURL: string = sprite.loaderInfo.loaderURL;
        let currentDomain: string = new LocalConnection().domain;
        let allowedDomains: any[] = this.decryptDomainList().split("|");
        let i: number = 0;
        while (i < allowedDomains.length) {
            entry = (asGuarded(allowedDomains[i], isString)).toLocaleLowerCase();
            if (entry == "?") {
                allowAll = true;
            } else if (entry.indexOf("localhost") != -1) {
                allowLocalhost = true;
            } else if (entry.indexOf("http:") == 0 || entry.indexOf("https:") == 0) {
                urlPrefixes.push(entry);
            } else {
                if (domainPattern != "") {
                    domainPattern += "|";
                }
                if (entry.indexOf("*.") == 0) {
                    entry = entry.replace("*.", "((\\w|-|_)+\\.)*");
                }
                domainPattern += entry;
            }
            i++;
        }
        let domainRegex: RegExp = new RegExp("^http(|s)://((www)+\\.)*(" + domainPattern + ")", "i");
        if (currentDomain.toLowerCase() == "localhost") {
            if (allowLocalhost) {
                return true;
            }
            if (allowAll) {
                sprite.width = 0;
                sprite.height = 0;
                return false;
            }
        }
        if (domainRegex.test(loaderURL)) {
            return true;
        }
        let j: number = 0;
        while (j < urlPrefixes.length) {
            if (loaderURL.indexOf(stringOrNull(urlPrefixes[j])) == 0) {
                return true;
            }
            j++;
        }
        if (domainPattern.length == 0 && urlPrefixes.length == 0 && allowAll) {
            return true;
        }
        //  sprite.width = 0;
        //  sprite.height = 0;
        return true;
    }

    private decryptDomainList(): string {
        let data: ByteArray = asInstanceOf(new this.encryptedDomainData(), ByteArray);
        let rc4: RC4Cipher = new RC4Cipher(asInstanceOf(new this.encryptionKey(), ByteArray));
        rc4.decrypt(data);
        data.position = 0;
        return data.readUTFBytes(data.length);
    }
}
