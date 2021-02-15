import { expect } from 'chai';
import * as ContractUtils from '../contract';

describe('getFinalPrice', () => {
    it("should return sell_price as final price when it's available", () => {
        const contract_info = {
            sell_price: 12345,
        };
        expect(ContractUtils.getFinalPrice(contract_info)).to.eql(12345);
    });
    it('should return sell_price as final price when sell_price && bid_price are available', () => {
        const contract_info = {
            sell_price: 12345,
            bid_price: 789,
        };
        expect(ContractUtils.getFinalPrice(contract_info)).to.eql(12345);
    });
    it('should return bid_price as final price when sell_price is not available and bid_price is available', () => {
        const contract_info = {
            bid_price: 789,
        };
        expect(ContractUtils.getFinalPrice(contract_info)).to.eql(789);
    });
    it('should return 0 as final price when sell_price and bid_price are empty', () => {
        const contract_info = {
            sell_price: false,
            bid_price: false,
        };
        expect(ContractUtils.getFinalPrice(contract_info)).to.eql(0);
    });
});

describe('getIndicativePrice', () => {
    it('should return getFinalPrice if it has final price and contract is ended', () => {
        const contract_info = {
            sell_price: 12345,
            status: 'sold',
        };
        expect(ContractUtils.getIndicativePrice(contract_info)).to.eql(12345);
    });
    it("should return null if it doesn't have final price, bid_price and contract is not ended", () => {
        const contract_info = {
            status: 'open',
        };
        expect(ContractUtils.getIndicativePrice(contract_info)).to.eql(null);
    });
    it("should return bid_price if it doesn't have final price, has bid_price and contract is not ended", () => {
        const contract_info = {
            status: 'open',
            bid_price: 12345,
        };
        expect(ContractUtils.getIndicativePrice(contract_info)).to.eql(12345);
    });
});

describe('isEnded', () => {
    it("should return false when there is status and it's equal to open in contract info", () => {
        const contract_info = {
            status: 'open',
        };
        expect(ContractUtils.isEnded(contract_info)).to.eql(false);
    });
    it("should return true when there is status and it's not equal to open in contract info", () => {
        const contract_info = {
            status: 'sold',
        };
        expect(ContractUtils.isEnded(contract_info)).to.eql(true);
    });
    it('should return true when contract is expired', () => {
        const contract_info = {
            status: 'open',
            is_expired: true,
        };
        expect(ContractUtils.isEnded(contract_info)).to.eql(true);
    });
    it('should return true when contract is settleable', () => {
        const contract_info = {
            status: 'open',
            is_expired: false,
            is_settleable: true,
        };
        expect(ContractUtils.isEnded(contract_info)).to.eql(true);
    });
    it('should return true when contract is not expired', () => {
        const contract_info = {
            status: 'open',
            is_expired: false,
        };
        expect(ContractUtils.isEnded(contract_info)).to.eql(false);
    });
    it('should return true when contract does not have is_settleable, is_expired and status', () => {
        const contract_info = {};
        expect(ContractUtils.isEnded(contract_info)).to.eql(false);
    });
});

describe('isUserSold', () => {
    it("should return true if contract's status is sold", () => {
        const contract_info = {
            status: 'sold',
        };
        expect(ContractUtils.isUserSold(contract_info)).to.eql(true);
    });
    it("should return false if contract's status is not sold", () => {
        const contract_info = {
            status: 'open',
        };
        expect(ContractUtils.isUserSold(contract_info)).to.eql(false);
    });
});

describe('isValidToSell', () => {
    it('should return true if contract is not ended and is not sold and contract is valid to_sell', () => {
        const contract_info = {
            status: 'open',
            is_valid_to_sell: 1,
        };
        expect(ContractUtils.isValidToSell(contract_info)).to.eql(true);
    });
    it('should return false if contract is ended and is sold and contract is valid to sell', () => {
        const contract_info = {
            status: 'sold',
            is_valid_to_sell: 1,
        };
        expect(ContractUtils.isValidToSell(contract_info)).to.eql(false);
    });
    it('should return false if contract is ended and is not sold and contract is valid to sell', () => {
        const contract_info = {
            status: 'won',
            is_valid_to_sell: 1,
        };
        expect(ContractUtils.isValidToSell(contract_info)).to.eql(false);
    });
    it('should return false if contract is ended and is sold and contract is not valid to sell', () => {
        const contract_info = {
            status: 'sold',
            is_valid_to_sell: 0,
        };
        expect(ContractUtils.isValidToSell(contract_info)).to.eql(false);
    });
    it('should return false if contract is ended and is not sold and contract is not valid to sell', () => {
        const contract_info = {
            status: 'won',
            is_valid_to_sell: 0,
        };
        expect(ContractUtils.isValidToSell(contract_info)).to.eql(false);
    });
    it('should return false if contract is not ended and is not sold and contract is not valid to sell', () => {
        const contract_info = {
            status: 'open',
            is_valid_to_sell: 0,
        };
        expect(ContractUtils.isValidToSell(contract_info)).to.eql(false);
    });
});

describe('getLastTickFromTickStream', () => {
    it('should return the last tick in the tick_stream array', () => {
        const tick_stream = [
            {
                tick: 766.53,
                epoch: 1000001,
            },
            {
                tick: 800.23,
                epoch: 1000002,
            },
        ];
        expect(ContractUtils.getLastTickFromTickStream(tick_stream)).to.deep.include({
            tick: 800.23,
            epoch: 1000002,
        });
    });
    it('should return an empty object if the tick_stream array is empty', () => {
        const tick_stream = [];
        expect(ContractUtils.getLastTickFromTickStream(tick_stream)).to.eql({});
    });
});

describe('isDigitContract', () => {
    it('should return true if contract is digits', () => {
        expect(ContractUtils.isDigitContract('DIGITMATCH')).to.eql(true);
    });

    it('should return false if contract is not digits', () => {
        expect(ContractUtils.isDigitContract('CALLPUT')).to.eql(false);
    });
});

describe('getDigitInfo', () => {
    it('should return an empty object when tick_stream is not in contract_info', () => {
        const contract_info = {};
        expect(ContractUtils.getDigitInfo({}, contract_info)).to.deep.eql({});
    });
    it('should return an empty object if tick_stream data is already in digits_info', () => {
        const contract_info = {
            entry_tick_time: 1544707342,
            entry_tick: 123.99,
            current_spot_time: 10000000,
            current_spot: 456.99,
            exit_tick_time: 10000001,
            contract_type: 'DIGITMATCH',
            barrier: 9,
            tick_stream: [
                {
                    tick: 123.456,
                    tick_display_value: '123.456',
                    epoch: 1544707344,
                },
            ],
        };
        const digits_info = {
            1544707344: {
                digit: 6,
                spot: '123.456',
            },
        };
        expect(ContractUtils.getDigitInfo(digits_info, contract_info)).to.deep.eql({});
    });
    it('should return a digits_info object with the latest tick_stream array data', () => {
        const contract_info = {
            tick_stream: [
                {
                    tick: 123.456,
                    tick_display_value: '123.456',
                    epoch: 1544707344,
                },
                {
                    tick: 456.993,
                    tick_display_value: '456.993',
                    epoch: 1544707346,
                },
            ],
        };
        const digits_info = {
            1544707346: {
                digit: 3,
                spot: '456.993',
            },
        };
        expect(ContractUtils.getDigitInfo({}, contract_info)).to.deep.eql(digits_info);
    });
});

expect('getDisplayStatus', () => {
    it('should return won if contract is ended and profit is more than zero', () => {
        const contract_info = {
            status: 'sold',
            profit: 100,
        };
        expect(ContractUtils.getDisplayStatus(contract_info)).to.eql('won');
    });
    it('should return lost if contract is ended and profit is less than zero', () => {
        const contract_info = {
            status: 'sold',
            profit: -100,
        };
        expect(ContractUtils.getDisplayStatus(contract_info)).to.eql('loss');
    });
    it('should return won if contract is ended and profit is zero', () => {
        const contract_info = {
            status: 'sold',
            profit: 0,
        };
        expect(ContractUtils.getDisplayStatus(contract_info)).to.eql('won');
    });
    it('should return purchased if contract is not ended', () => {
        const contract_info = {
            status: 'open',
        };
        expect(ContractUtils.getDisplayStatus(contract_info)).to.eql('purchased');
    });
});
