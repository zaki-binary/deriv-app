import React from 'react';

export const getCardLabels = () => ({
    APPLY: 'Apply',
    STAKE: 'Stake:',
    CLOSE: 'Close',
    CANCEL: 'Cancel',
    CURRENT_STAKE: 'Current stake:',
    DEAL_CANCEL_FEE: 'Deal cancel. fee:',
    TAKE_PROFIT: 'Take profit:',
    BUY_PRICE: 'Buy price:',
    STOP_LOSS: 'Stop loss:',
    TOTAL_PROFIT_LOSS: 'Total profit/loss:',
    PROFIT_LOSS: 'Profit/Loss:',
    POTENTIAL_PROFIT_LOSS: 'Potential profit/loss:',
    INDICATIVE_PRICE: 'Indicative price:',
    PAYOUT: 'Sell price:',
    PURCHASE_PRICE: 'Buy price:',
    POTENTIAL_PAYOUT: 'Payout limit:',
    TICK: 'Tick ',
    WON: 'Won',
    LOST: 'Lost',
    DAYS: 'Days',
    DAY: 'Day',
    SELL: 'Sell',
    INCREMENT_VALUE: 'Increment value',
    DECREMENT_VALUE: 'Decrement value',
    TAKE_PROFIT_LOSS_NOT_AVAILABLE: 'Take profit and/or stop loss are not available while deal cancellation is active.',
    DONT_SHOW_THIS_AGAIN: "Don't show this again",
    RESALE_NOT_OFFERED: 'Resale not offered',
});

export const getMarketNamesMap = () => ({
    FRXAUDCAD: 'AUD/CAD',
    FRXAUDCHF: 'AUD/CHF',
    FRXAUDJPY: 'AUD/JPY',
    FRXAUDNZD: 'AUD/NZD',
    FRXAUDPLN: 'AUD/PLN',
    FRXAUDUSD: 'AUD/USD',
    FRXBROUSD: 'Oil/USD',
    FRXEURAUD: 'EUR/AUD',
    FRXEURCAD: 'EUR/CAD',
    FRXEURCHF: 'EUR/CHF',
    FRXEURGBP: 'EUR/GBP',
    FRXEURJPY: 'EUR/JPY',
    FRXEURNZD: 'EUR/NZD',
    FRXEURUSD: 'EUR/USD',
    FRXGBPAUD: 'GBP/AUD',
    FRXGBPCAD: 'GBP/CAD',
    FRXGBPCHF: 'GBP/CHF',
    FRXGBPJPY: 'GBP/JPY',
    FRXGBPNOK: 'GBP/NOK',
    FRXGBPUSD: 'GBP/USD',
    FRXNZDJPY: 'NZD/JPY',
    FRXNZDUSD: 'NZD/USD',
    FRXUSDCAD: 'USD/CAD',
    FRXUSDCHF: 'USD/CHF',
    FRXUSDJPY: 'USD/JPY',
    FRXUSDNOK: 'USD/NOK',
    FRXUSDPLN: 'USD/PLN',
    FRXUSDSEK: 'USD/SEK',
    FRXXAGUSD: 'Silver/USD',
    FRXXAUUSD: 'Gold/USD',
    FRXXPDUSD: 'Palladium/USD',
    FRXXPTUSD: 'Platinum/USD',
    OTC_AEX: 'Dutch Index',
    OTC_AS51: 'Australian Index',
    OTC_DJI: 'Wall Street Index',
    OTC_FCHI: 'French Index',
    OTC_FTSE: 'UK Index',
    OTC_GDAXI: 'German Index',
    OTC_HSI: 'Hong Kong Index',
    OTC_IBEX35: 'Spanish Index',
    OTC_N225: 'Japanese Index',
    OTC_NDX: 'US Tech Index',
    OTC_SPC: 'US Index',
    OTC_SSMI: 'Swiss Index',
    OTC_SX5E: 'Euro 50 Index',
    R_10: 'Volatility 10 Index',
    R_25: 'Volatility 25 Index',
    R_50: 'Volatility 50 Index',
    R_75: 'Volatility 75 Index',
    R_100: 'Volatility 100 Index',
    RDBEAR: 'Bear Market Index',
    RDBULL: 'Bull Market Index',
    WLDAUD: 'AUD Index',
    WLDEUR: 'EUR Index',
    WLDGBP: 'GBP Index',
    WLDUSD: 'USD Index',
    '1HZ10V': 'Volatility 10 (1s) Index',
    '1HZ100V': 'Volatility 100 (1s) Index',
});

export const getUnsupportedContracts = () => ({
    EXPIRYMISS: {
        name: 'Ends Outside',
        position: 'top',
    },
    EXPIRYRANGE: {
        name: 'Ends Between',
        position: 'bottom',
    },
    RANGE: {
        name: 'Stays Between',
        position: 'top',
    },
    UPORDOWN: {
        name: 'Goes Outside',
        position: 'bottom',
    },
    RESETCALL: {
        name: 'Reset Call',
        position: 'top',
    },
    RESETPUT: {
        name: 'Reset Put',
        position: 'bottom',
    },
    TICKHIGH: {
        name: 'High Tick',
        position: 'top',
    },
    TICKLOW: {
        name: 'Low Tick',
        position: 'bottom',
    },
    ASIANU: {
        name: 'Asian Up',
        position: 'top',
    },
    ASIAND: {
        name: 'Asian Down',
        position: 'bottom',
    },
    LBFLOATCALL: {
        name: 'Close-to-Low',
        position: 'top',
    },
    LBFLOATPUT: {
        name: 'High-to-Close',
        position: 'top',
    },
    LBHIGHLOW: {
        name: 'High-to-Low',
        position: 'top',
    },
    CALLSPREAD: {
        name: 'Spread Up',
        position: 'top',
    },
    PUTSPREAD: {
        name: 'Spread Down',
        position: 'bottom',
    },
    RUNHIGH: {
        name: 'Only Ups',
        position: 'top',
    },
    RUNLOW: {
        name: 'Only Downs',
        position: 'bottom',
    },
});

export const getSupportedContracts = is_high_low => ({
    CALL: {
        name: is_high_low ? 'Higher' : 'Rise',
        position: 'top',
    },
    PUT: {
        name: is_high_low ? 'Lower' : 'Fall',
        position: 'bottom',
    },
    CALLE: {
        name: 'Rise',
        position: 'top',
    },
    PUTE: {
        name: 'Fall',
        position: 'bottom',
    },
    DIGITMATCH: {
        name: 'Matches',
        position: 'top',
    },
    DIGITDIFF: {
        name: 'Differs',
        position: 'bottom',
    },
    DIGITEVEN: {
        name: 'Even',
        position: 'top',
    },
    DIGITODD: {
        name: 'Odd',
        position: 'bottom',
    },
    DIGITOVER: {
        name: 'Over',
        position: 'top',
    },
    DIGITUNDER: {
        name: 'Under',
        position: 'bottom',
    },
    ONETOUCH: {
        name: 'Touch',
        position: 'top',
    },
    NOTOUCH: {
        name: 'No Touch',
        position: 'bottom',
    },
    MULTUP: {
        name: 'Up',
        position: 'top',
    },
    MULTDOWN: {
        name: 'Down',
        position: 'bottom',
    },
});

export const getContractConfig = is_high_low => ({
    ...getSupportedContracts(is_high_low),
    ...getUnsupportedContracts(),
});

export const getContractTypeDisplay = (type, is_high_low = false) => {
    return getContractConfig(is_high_low)[type] ? getContractConfig(is_high_low)[type.toUpperCase()].name : '';
};

export const getContractTypePosition = (type, is_high_low = false) =>
    getContractConfig(is_high_low)[type] ? getContractConfig(is_high_low)[type.toUpperCase()].position : 'top';
