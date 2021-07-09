export const state = {
    // globals
    isLoading: true,
    personnelsEvent: false,
    cashesAndAccountsEvent: false,
    recipientsEvent: false,
    stuffDetailsEvent: false,
    setPersonnelsEvent: false,
    paidEvent: true,
    stuffList: true,
    stuffsStock: false,
    // components instance
    instance: {
        stuffModal: null,
        editStuffModal: null,
        fullModal: null,
        descModal: null,
        filterOptionsCanvas: null,
        storeFilterCanvas: null,
        factureFooterCanvas: null,
        stateModeToast: null,
        globalNotice: null,
    },
    // facture mediators
    mediator: {
        person: {},
        persons: [],
        store: {},
        storeInStuffList: {},
        stores: [],
        stuff: {},
        editStuff: {},
        stuffs: [],
        personSearchKey: '',
        storeSearchKey: '',
        storeStuffFilter: '',
        stuffSingleClass: {},
        stuffFirstClassGroup: [],
        stuffSecondSingleClass: {},
        stuffSecondClassGroup: [],
        stuffThirdSingleClass: {},
        stuffThirdClassGroup: [],

        marketers: [],
        players: [],
        receiptAgents: [],
        marketerID: 0,
        playerID: 0,
        receiptAgentID: 0,

        allCashes: [],
        cashes: [],
        accountsPose: [],
        accounts: [],
        cashID: 0,
        accountID: 0,
        accountID2: 0,
        accountID3: 0,
        cashAmount: 0,
        accountAmount1: 0,
        accountAmount2: 0,
        accountAmount3: 0,

        dDiscount: 0,
        dTaxPercent: 0,
        dImpositionPercent: 0,
        dTransportRent: 0,

        sPersonRequired: false,
        sPerson: '',
        sPersonTel: '',
        sPersonAddress: '',
        sPersonNationalCode: '',
        sPersonPostCode: '',
        sPersonTel2: '',

        factureSumPaid: 0,
        factureNesieh: 0,
        factureDesc: '',
    },
    // facture data
    facture: {
        iType: 0,
        date: new Date(),
        iProjectID: 0,
        iStoreID: 0,
        iPersonID: 0,
        sPersonName: '',
        sPersonTel: '',
        sPersonAddress: '',
        sPersonNationalCode: '',
        sPersonPostCode: '',
        sPersonTel2: '',
        dSum: 0,
        dSumAll: 0,
        dSumPaid: 0,
        dSpot: 0,
        dNesieh: 0,
        dDiscount: 0,
        dDiscountPercent: 0,
        dTax: 0,
        dTaxPercent: 0,
        dImposition: 0,
        dImpositionPercent: 0,
        dTransportRent: 0,
        dTransportAmount: 0,
        iPersonnelID: 0,
        iPersonnelID2: 0,
        iPersonnelID3: 0,
        iCashID: 0,
        iAccountID: 0,
        iAccountID2: 0,
        iAccountID3: 0,
        dCashAmount: 0,
        dAccountAmount1: 0,
        dAccountAmount2: 0,
        dAccountAmount3: 0,
        sPayNumber1: 0,
        sPayNumber2: 0,
        sPayNumber3: 0,
        dGPSx: 0,
        dGPSy: 0,
        sDesc: '',
        stuffs: [],
    },
}

export const mutations = {
    // set persons
    SET_PERSONS(state, persons) {
        let statePersons = state.mediator.persons
        statePersons = persons
        statePersons.map(person => (person.uniqID = this.randomString()))

        let isPersonInStorage = localStorage.person
        let statePerson = state.mediator.person
        let facturePersonID = state.facture.iPersonID

        if (isPersonInStorage) {
            statePerson = {
                iID: JSON.parse(localStorage.person).iID,
                fullName: JSON.parse(localStorage.person).fullName,
                bCustomPerson: JSON.parse(localStorage.person).bCustomPerson,
                iPersonnelID: JSON.parse(localStorage.person).iPersonnelID,
                iPersonnelID2: JSON.parse(localStorage.person).iPersonnelID2,
                iPersonnelID3: JSON.parse(localStorage.person).iPersonnelID3,
            }

            facturePersonID = JSON.parse(localStorage.person).iID
        }

        state.isLoading = false
    },
    // select person
    SELECT_PERSON(state, person) {
        let sFamily = person.sFamily ? person.sFamily : ''
        let statePerson = state.mediator.person

        statePerson = {
            iID: person.iID,
            fullName: person.sName + ' ' + sFamily.trim(),
            bCustomPerson: person.bCustomPerson,
            iPersonnelID: person.iPersonnelID,
            iPersonnelID2: person.iPersonnelID2,
            iPersonnelID3: person.iPersonnelID3,
        }

        localStorage.setItem('person', JSON.stringify(statePerson))

        let facturePersonID = state.facture.iPersonID
        facturePersonID = state.mediator.person.iID
    },
    // set stores
    SET_STORES(state, stores) {
        let stateStores = state.mediator.stores
        stateStores = stores

        let isStoreInStorage = localStorage.store
        let stateStore = state.mediator.store
        let factureStoreID = state.facture.iStoreID

        if (isStoreInStorage) {
            stateStore = {
                iID: JSON.parse(localStorage.store).iID,
                sName: JSON.parse(localStorage.store).sName,
            }

            factureStoreID = stateStore.iID
        } else {
            stateStore = {
                iID: stateStores[0].iID,
                sName: stateStores[0].sName,
            }

            factureStoreID = stateStore.iID
        }

        state.isLoading = false
    },
    // select store
    SELECT_STORE() {},
}

export const actions = {
    async getPersons({ commit, state }) {
        await EventService.getPersons(state.mediator['personSearchKey'])
            .then(({ data }) => commit('SET_PERSONS', data))
            .catch(err => err)
    },

    selectPerson(person) {
        commit('SET_PERSON', person)
    },

    async getStores({ commit, dispatch, state }) {
        await EventService.getStores(state.mediator['storeSearchKey'])
            .then(({ data }) => {
                commit('SET_STORES', data)
                dispatch('getStuffs')
            })
            .catch(err => err)
    },
}

export const getters = {}
