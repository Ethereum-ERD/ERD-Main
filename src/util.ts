import { ethers } from 'ethers';
import { format } from 'mathjs';

import { TERMS_SAVED_KEY, DO_NOT_SHOW_AGAIN_KEY } from 'src/constants';
import { Errors } from 'src/Error';

export const getContractErrorMsg = (code: string) => {
    if (!code) return 'Unknown error';
    return Errors[code] || `Unknown error code ${code}`;
};

export const checkSumAddr = (addr: string) => {
    return ethers.utils.isAddress(addr);
}

export const getUserAgreeTerms = () => {
    return window.sessionStorage.getItem(TERMS_SAVED_KEY) || "";
};

export const setUserAgreeTerms = (v: string) => {
    window.sessionStorage.setItem(TERMS_SAVED_KEY, v);
};

export const getDoNotShowAgain = () => {
    return window.localStorage.getItem(DO_NOT_SHOW_AGAIN_KEY) || "";
};

export const setDoNotShowAgain = (v: string) => {
    window.localStorage.setItem(DO_NOT_SHOW_AGAIN_KEY, v);
};

export const clearDoNotShowAgain = () => {
    window.localStorage.removeItem(DO_NOT_SHOW_AGAIN_KEY);
};

export function truncateNumber(num: number) {
    return Math.trunc(num);
}

export function toBN(num: number | string) {
    if (typeof num === 'string') {
        return ethers.BigNumber.from(num);
    }
    return ethers.BigNumber.from(fixNumber(num));
}

export function formatUint(num: number) {
    if (num < 1e4) {
        return (num).toFixed(0);
    }
    if (num < 1e6) {
        return `${parseInt((num / 1e3).toFixed(0))}K`;
    }
    if (num < 1e9) {
        return `${parseInt((num / 1e6).toFixed(0))}M`;
    }
    return `${parseInt((num / 1e9).toFixed(0))}B`;
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

export function formatNumber(v: number) {
    if (Number.isNaN(v) || typeof v !== 'number') {
        return v;
    }
    if (v >= 1e9) {
        return (v / 1e9).toFixed(2) + "B";
    } else if (v >= 1e6) {
        return (v / 1e6).toFixed(2) + "M";
    } else if (v >= 1e3) {
        return (v / 1e3).toFixed(2) + "K";
    } else {
        return v.toFixed(2);
    }
}

export function translateUint(v: number) {
    if (Number.isNaN(v) || typeof v !== 'number') {
        return [v, ''];
    }
    if (v >= 1e9) {
        return [(v / 1e9).toFixed(2), 'B'];
    }
    if (v >= 1e6) {
        return [(v / 1e6).toFixed(2), 'M'];
    }

    if (v >= 1e3) {
        return [(v / 1e3).toFixed(2), 'K'];
    }

    return [`${v.toFixed(2)}`, ''];
}

export function OpenEtherScan(url: string) {
    window.open(url, '_blank');
}
