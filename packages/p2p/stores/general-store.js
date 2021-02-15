import React from 'react';
import { action, computed, observable } from 'mobx';
import { isEmptyObject, mobileOSDetect, routes } from '@deriv/shared';
import { localize, Localize } from 'Components/i18next';
import { createExtendedOrderDetails } from 'Utils/orders.js';
import { init as WebsocketInit, requestWS, subscribeWS } from 'Utils/websocket';
import { order_list } from '../src/constants/order-list';
import BaseStore from 'Stores/base_store';

export default class GeneralStore extends BaseStore {
    @observable active_index = 0;
    @observable active_notification_count = 0;
    @observable advertiser_id = null;
    @observable inactive_notification_count = 0;
    @observable is_advertiser = false;
    @observable is_listed = false;
    @observable is_restricted = false;
    @observable nickname = null;
    @observable nickname_error = '';
    @observable notification_count = 0;
    @observable order_id = null;
    @observable.ref order_information = null;
    @observable order_offset = 0;
    @observable order_table_type = order_list.ACTIVE;
    @observable orders = [];
    @observable parameters = null;
    @observable poi_status = null;
    @observable should_show_real_name = false;
    @observable show_popup = false;

    custom_string = this.props?.custom_string;
    list_item_limit = 20;
    path = {
        buy_sell: 0,
        orders: 1,
        my_ads: 2,
        my_profile: 3,
    };
    props = {};
    ws_subscriptions = {};
    service_token_timeout;

    @computed
    get client() {
        return this.props?.client || {};
    }

    @computed
    get is_active_tab() {
        return this.order_table_type === order_list.ACTIVE;
    }

    @action.bound
    createAdvertiser(name) {
        requestWS({ p2p_advertiser_create: 1, name }).then(response => {
            const { p2p_advertiser_create } = response;
            if (response) {
                if (response.error) {
                    this.setNicknameError(response.error.message);
                } else {
                    this.setAdvertiserId(p2p_advertiser_create.id);
                    this.setIsAdvertiser(!!p2p_advertiser_create.is_approved);
                    this.setNickname(p2p_advertiser_create.name);
                    this.setNicknameError(undefined);
                    this.root_store.sendbird_store.handleP2pAdvertiserInfo(response);
                    this.toggleNicknamePopup();
                }
            }
        });
    }

    getLocalStorageSettings() {
        return JSON.parse(localStorage.getItem('p2p_settings') || '{}');
    }

    getLocalStorageSettingsForLoginId() {
        const local_storage_settings = this.getLocalStorageSettings()[this.client.loginid];

        if (isEmptyObject(local_storage_settings)) {
            return { is_cached: false, notifications: [] };
        }

        return local_storage_settings;
    }

    @action.bound
    handleNotifications(old_orders, new_orders) {
        const { client, props } = this;
        const { is_cached, notifications } = this.getLocalStorageSettingsForLoginId();
        new_orders.forEach(new_order => {
            const order_info = createExtendedOrderDetails(new_order, client.loginid, props.server_time);
            const notification = notifications.find(n => n.order_id === new_order.id);
            const old_order = old_orders.find(o => o.id === new_order.id);
            const is_current_order = new_order.id === this.props?.order_id;
            const notification_obj = {
                order_id: new_order.id,
                is_seen: is_current_order,
                is_active: order_info.is_active_order,
            };

            if (old_order) {
                if (old_order.status !== new_order.status) {
                    if (notification) {
                        // If order status changed, notify the user.
                        notification.is_seen = is_current_order;
                        notification.is_active = order_info.is_active_order;
                    } else {
                        // If we have an old_order, but for some reason don't have a copy in local storage.
                        notifications.push(notification_obj);
                    }
                }
            } else if (!notification) {
                // If we don't have an old order nor a notification, this is a first page load. Compare with
                // cached list or only notify user of actionable orders.
                if (is_cached) {
                    // If we can compare with a cached list, assume each new order should be notified.
                    notifications.push(notification_obj);
                } else {
                    // If we don't have a cached list, only notify user of orders that require action.
                    // This is done so user isn't spammed with old orders after resetting their local storage.
                    const actionable_statuses = ['pending', 'buyer-confirmed'];
                    const is_action_required = actionable_statuses.includes(new_order.status);
                    notifications.push({
                        ...notification_obj,
                        is_seen: is_current_order || !is_action_required,
                    });
                }
            }
        });

        this.updateP2pNotifications(notifications);
    }

    @action.bound
    handleTabClick(idx) {
        this.setActiveIndex(idx);
        this.setParameters(null);
    }

    @action.bound
    getVerificationChecklist = () => [
        {
            content: this.nickname || <Localize i18n_default_text='Choose your nickname' />,
            status: this.nickname ? 'done' : 'action',
            onClick: this.nickname ? () => {} : this.toggleNicknamePopup,
        },
        {
            content: this.poiStatusText(this.poi_status),
            status: this.poi_status === 'verified' ? 'done' : 'action',
            onClick:
                this.poi_status === 'verified'
                    ? () => {}
                    : () => (window.location.href = `${this.props.poi_url}?ext_platform_url=${routes.cashier_p2p}`),
            is_disabled: this.poi_status !== 'verified' && !this.nickname,
        },
    ];

    @action.bound
    onMount() {
        const { sendbird_store } = this.root_store;

        this.ws_subscriptions = {
            advertiser_subscription: subscribeWS(
                {
                    p2p_advertiser_info: 1,
                    subscribe: 1,
                },
                [this.updateAdvertiserInfo, response => sendbird_store.handleP2pAdvertiserInfo(response)]
            ),
            order_list_subscription: subscribeWS(
                {
                    p2p_order_list: 1,
                    subscribe: 1,
                    offset: 0,
                    limit: this.list_item_limit,
                },
                [this.setP2pOrderList]
            ),
        };
    }

    @action.bound
    onUnmount() {
        clearTimeout(this.service_token_timeout);
        Object.keys(this.ws_subscriptions).forEach(key => this.ws_subscriptions[key].unsubscribe());
    }

    @action.bound
    onNicknamePopupClose() {
        this.setShowPopup(false);
    }

    @action.bound
    openApplicationStore() {
        if (mobileOSDetect() === 'Android') {
            window.location.href =
                'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.deriv.dp2p';
        }
        // uncomment when iOS app is ready
        // if (mobileOSDetect() === 'iOS') {
        //     window.location.href = 'http://itunes.apple.com/lb/app/truecaller-caller-id-number/id448142450?mt=8';
        // }
    }

    @action.bound
    poiStatusText(status) {
        switch (status) {
            case 'pending':
            case 'rejected':
                return <Localize i18n_default_text='Check your verification status.' />;
            case 'none':
            default:
                return (
                    <Localize i18n_default_text='We’ll need you to upload your documents to verify your identity.' />
                );
            case 'verified':
                return <Localize i18n_default_text='Identity verification is complete.' />;
        }
    }

    @action.bound
    redirectTo(path_name, params = null) {
        this.setActiveIndex(this.path[path_name]);
        this.setParameters(params);
    }

    @action.bound
    resetNicknameErrorState() {
        this.setNicknameError(undefined);
    }

    @action.bound
    setActiveIndex(active_index) {
        this.active_index = active_index;
    }

    @action.bound
    setActiveNotificationCount(active_notification_count) {
        this.active_notification_count = active_notification_count;
    }

    @action.bound
    setAdvertiserId(advertiser_id) {
        this.advertiser_id = advertiser_id;
    }

    setAppProps(props) {
        this.props = props;
    }

    @action.bound
    setInactiveNotificationCount(inactive_notification_count) {
        this.inactive_notification_count = inactive_notification_count;
    }

    @action.bound
    setIsAdvertiser(is_advertiser) {
        this.is_advertiser = is_advertiser;
    }

    @action.bound
    setIsListed(is_listed) {
        this.is_listed = is_listed;
    }

    @action.bound
    setIsRestricted(is_restricted) {
        this.is_restricted = is_restricted;
    }

    @action.bound
    setNickname(nickname) {
        this.nickname = nickname;
    }

    @action.bound
    setNicknameError(nickname_error) {
        this.nickname_error = nickname_error;
    }

    @action.bound
    setNotificationCount(notification_count) {
        this.notification_count = notification_count;
    }

    @action.bound
    setOrderId(order_id) {
        this.order_id = order_id;

        if (typeof this.props.setOrderId === 'function') {
            this.props.setOrderId(order_id);
        }
    }

    @action.bound
    setOrderInformation(order_information) {
        this.order_information = order_information;
    }

    @action.bound
    setOrderOffset(order_offset) {
        this.order_offset = order_offset;
    }

    @action.bound
    setOrderTableType(order_table_type) {
        this.order_table_type = order_table_type;
    }

    @action.bound
    setOrders(orders) {
        this.orders = orders;
    }

    @action.bound
    setP2pOrderList(order_response) {
        if (order_response.error) {
            this.ws_subscriptions.order_list_subscription.unsubscribe();
            return;
        }
        const { p2p_order_list, p2p_order_info } = order_response;

        if (p2p_order_list) {
            const { list } = p2p_order_list;
            // it's an array of orders from p2p_order_list
            this.handleNotifications(this.orders, list);
        } else if (p2p_order_info) {
            // it's a single order from p2p_order_info
            const idx_order_to_update = this.orders.findIndex(order => order.id === p2p_order_info.id);
            const updated_orders = [...this.orders];
            // if it's a new order, add it to the top of the list
            if (idx_order_to_update < 0) {
                updated_orders.unshift(p2p_order_info);
            } else {
                // otherwise, update the correct order
                updated_orders[idx_order_to_update] = p2p_order_info;
            }

            this.handleNotifications(this.orders, updated_orders);
            this.root_store.order_store.syncOrder(p2p_order_info);
        }
    }

    @action.bound
    setParameters(parameters) {
        this.parameters = parameters;
    }

    @action.bound
    setPoiStatus(poi_status) {
        this.poi_status = poi_status;
    }

    @action.bound
    setShouldShowRealName(should_show_real_name) {
        this.should_show_real_name = should_show_real_name;
    }

    @action.bound
    setShowPopup(show_popup) {
        this.show_popup = show_popup;
    }

    @action.bound
    setWebsocketInit = (websocket, local_currency_decimal_places) => {
        WebsocketInit(websocket, local_currency_decimal_places);
    };

    @action.bound
    toggleNicknamePopup() {
        this.setShowPopup(!this.show_popup);
        this.resetNicknameErrorState();
    }

    @action.bound
    updateAdvertiserInfo(response) {
        const { p2p_advertiser_info } = response;

        if (!response.error) {
            this.setAdvertiserId(p2p_advertiser_info.id);
            this.setIsAdvertiser(!!p2p_advertiser_info.is_approved);
            this.setIsListed(!!p2p_advertiser_info.is_listed);
            this.setNickname(p2p_advertiser_info.name);
            this.setShouldShowRealName(!!p2p_advertiser_info.show_name);
        } else {
            this.ws_subscriptions.advertiser_subscription.unsubscribe();

            if (response.error.code === 'RestrictedCountry') {
                this.setIsRestricted(true);
            } else if (response.error.code === 'AdvertiserNotFound') {
                this.setIsAdvertiser(false);
            }
        }

        if (!this.is_advertiser) {
            requestWS({ get_account_status: 1 }).then(account_response => {
                if (!account_response.error) {
                    const { get_account_status } = account_response;
                    const { authentication } = get_account_status;
                    const { identity } = authentication;

                    this.setPoiStatus(identity.status);
                }
            });
        }
    }

    @action.bound
    updateP2pNotifications(notifications) {
        const unseen_notifications = notifications.filter(notification => notification.is_seen === false);
        const notification_count = unseen_notifications.length;
        const active_notification_count = unseen_notifications.filter(notification => notification.is_active).length;
        const inactive_notification_count = notification_count - active_notification_count;
        const user_settings = this.getLocalStorageSettingsForLoginId();
        user_settings.is_cached = true;
        user_settings.notifications = notifications;

        const p2p_settings = this.getLocalStorageSettings();
        p2p_settings[this.client.loginid] = user_settings;

        localStorage.setItem('p2p_settings', JSON.stringify(p2p_settings));

        this.setNotificationCount(notification_count);
        this.setActiveNotificationCount(active_notification_count);
        this.setInactiveNotificationCount(inactive_notification_count);

        if (typeof this.props?.setNotificationCount === 'function') {
            this.props.setNotificationCount(notification_count);
        }
    }

    @action.bound
    validatePopup(values) {
        const validations = {
            nickname: [
                v => !!v,
                v => v.length >= 2,
                v => v.length <= 24,
                v => /^[a-zA-Z0-9\\.@_-]{2,24}$/.test(v),
                v => /^(?!(.*(.)\\2{4,})|.*[\\.@_-]{2,}|^([\\.@_-])|.*([\\.@_-])$)[a-zA-Z0-9\\.@_-]{2,24}$/.test(v),
                v =>
                    Array.from(v).every(
                        word => (v.match(new RegExp(word === '.' ? `\\${word}` : word, 'g')) || []).length <= 5
                    ),
            ],
        };

        const nickname_messages = [
            localize('Nickname is required'),
            localize('Nickname is too short'),
            localize('Nickname is too long'),
            localize('Can only contain letters, numbers, and special characters .- _ @.'),
            localize('Cannot start, end with, or repeat special characters.'),
            localize('Cannot repeat a character more than 5 times.'),
        ];

        const errors = {};

        Object.entries(validations).forEach(([key, rules]) => {
            const error_index = rules.findIndex(v => {
                return !v(values[key]);
            });

            if (error_index !== -1) {
                switch (key) {
                    case 'nickname':
                    default: {
                        errors[key] = nickname_messages[error_index];
                        break;
                    }
                }
            }
        });

        return errors;
    }
}
