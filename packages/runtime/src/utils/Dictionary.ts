/**
 * AS3's Dictionary: a Map whose keys compare as AS3's do. Objects are keys by identity; a string that
 * is a number's canonical form is that number (6 and "6" are one key, so an entry added under an
 * int id is found by the id's string, as the client does). Generated code creates these for every
 * `new Dictionary()`; it is typed as a plain Map everywhere else.
 */
export class Dictionary<K = any, V = any> extends Map<K, V> {
    override get(key: K): V | undefined {
        return super.get(canonical(key));
    }

    override set(key: K, value: V): this {
        return super.set(canonical(key), value);
    }

    override has(key: K): boolean {
        return super.has(canonical(key));
    }

    override delete(key: K): boolean {
        return super.delete(canonical(key));
    }
}

function canonical<K>(key: K): K {
    if (typeof key !== 'string' || key === '') return key;
    // only a number's own form can come back from String(Number(key)) unchanged, and that starts with a digit,
    // '-', or is NaN or Infinity: anything else is a name, kept without making the number's string to compare
    const c = key.charCodeAt(0);
    if (!(c >= 48 && c <= 57) && c !== 45 && c !== 73 && c !== 78) return key;
    // a plain decimal integer (the room's object ids, looked up for every object every frame) is its number, read
    // without making a string to compare: up to 15 digits, without a leading zero, it is a number's own form
    const length = key.length;
    if (length <= 15 && (c !== 48 || length === 1)) {
        let value = 0, i = 0;
        for (; i < length; i++) {
            const digit = key.charCodeAt(i) - 48;
            if (digit < 0 || digit > 9) break;
            value = value * 10 + digit;
        }
        if (i === length) return value as K;
    }
    const n = Number(key);
    return String(n) === key ? (n as K) : key;
}
