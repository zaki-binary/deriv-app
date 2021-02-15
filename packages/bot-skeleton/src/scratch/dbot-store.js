class DBotStoreInterface {
    // TODO here we are suppose to define an interface and implement fields of DBotStore.
    handleFileChange = () => {
        throw Error('handleFileChange has not been implemented.');
    };

    toggleStrategyModal = () => {
        throw Error('handleFileChange has not been implemented.');
    };
}

class DBotStore extends DBotStoreInterface {
    static singleton = null;

    constructor(store) {
        super();
        this.is_mobile = store.is_mobile || false;
        this.is_dark_mode_on = store.is_dark_mode_on || false;
        this.client = store.client;
        this.flyout = store.flyout;
        this.toolbar = store.toolbar;
        this.save_modal = store.save_modal;
        this.toggleStrategyModal = store.toggleStrategyModal;
        this.handleFileChange = store.handleFileChange;
        this.startLoading = store.startLoading;
        this.endLoading = store.endLoading;
    }

    static setInstance(store) {
        this.singleton = new DBotStore(store);
        return this.instance;
    }

    static get instance() {
        return this.singleton;
    }
}

export default DBotStore;
