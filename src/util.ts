import { ethers } from 'ethers';
import { format } from 'mathjs';

export function truncateNumber(num: number) {
    return Math.trunc(num);
}

export function toBN(num: number | string) {
    if (typeof num === 'string') {
        return ethers.BigNumber.from(num);
    }
    return ethers.BigNumber.from(fixNumber(num));
}

export function addCommas(num: number | string) {
    const nStr = num + '';

    const x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';

    const rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
        // eslint-disable-next-line no-useless-concat
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export function fixNumber(n: number) {
    return format(n, { notation: 'fixed', upperExp: 1e100 });
}

export function formatUnits(v: number, uint = 18, floatLen = 2) {
    const vStr = ethers.utils.formatUnits(
        fixNumber(v),
        uint
    );

    const [int, float] = vStr.split('.');

    if (floatLen > 0) {
        let floatPart = '0'.repeat(floatLen);
        if (float) {
            floatPart = float.slice(0, floatLen).padEnd(floatLen, '0');
        }
        return [int, '.', floatPart].join('');
    }

    return int;
}

export function truncateDecimal(v: number, decimalPlaces = 2) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.trunc(v * factor) / factor;
}

export function translateUint(v: number) {
    if (Number.isNaN(v) || typeof v !== 'number') {
        return [v, ''];
    }
    if (v > 1e10) {
        return [(v / 1e10).toFixed(2), 'B'];
    }
    if (v > 1e6) {
        return [(v / 1e6).toFixed(2), 'M'];
    }

    if (v > 1e3) {
        return [(v / 1e3).toFixed(2), 'K'];
    }

    return [`${v}`, ''];
}

export function OpenEtherScan(url: string) {
    window.open(url, '_blank');
}
