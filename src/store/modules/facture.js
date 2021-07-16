import EventService from '@/services/EventService'
import { randomString } from '@/utils/randomString'

export const namespaced = true

export const state = {
    factureNumber: 0,
    // person area
    persons: [],
    person: {},
    // store area
    stores: [],
    store: {},
    // stuff area
    stuffs: [],
    stuff: {},
    stuffSearchKey: '',
    stuffsStock: 0,
    // stuff class group
    stuffFirstClassGroup: [],
    stuffSecondClassGroup: [],
    stuffThirdClassGroup: [],
    // facture states
    facture: {
        iType: 0,
        iPersonID: null,
        iStoreID: null,
        stuffs: [],
    },
}

export const mutations = {
    SET_FACTURE_NUM(state, factureNum) {
        state.factureNumber = factureNum + 1
    },
    // give and set all persons
    SET_PERSONS(state, data) {
        state.persons = data
        // set persons uniqe id for accordion
        state.persons.map(person => (person.uniqID = randomString()))
        // if local person exist set them
        if (localStorage.person) {
            let localPerson = JSON.parse(localStorage.person)

            state.person = {
                iID: localPerson.iID,
                fullName: localPerson.fullName,
                bCustomPerson: localPerson.bCustomPerson,
                iPersonnelID: localPerson.iPersonnelID,
                iPersonnelID2: localPerson.iPersonnelID2,
                iPersonnelID3: localPerson.iPersonnelID3,
            }
            // set facture personID
            state.facture.iPersonID = state.person.iID
        }
    },
    // set selected person in state/facture
    SET_PERSON(state, person) {
        let sFamily = person.sFamily ? person.sFamily : ''
        // set person to state
        state.person = {
            iID: person.iID,
            fullName: person.sName + ' ' + sFamily.trim(),
            bCustomPerson: person.bCustomPerson,
            iPersonnelID: person.iPersonnelID,
            iPersonnelID2: person.iPersonnelID2,
            iPersonnelID3: person.iPersonnelID3,
        }
        // set person localStorage for reload page
        localStorage.setItem('person', JSON.stringify(state.person))
        state.facture.iPersonID = state.person.iID
    },
    // give and set all stores
    SET_STORES(state, stores) {
        state.stores = stores

        if (localStorage.store) {
            let localStore = JSON.parse(localStorage.store)
            state.store = {
                iID: localStore.iID,
                sName: localStore.sName,
            }
        } else {
            state.store = {
                iID: state.stores[0].iID,
                sName: state.stores[0].sName,
            }
        }

        state.facture.iStoreID = state.store.iID
    },
    // set selected store in state/facture
    SET_STORE(state, store) {
        state.store = {
            iID: store.iID,
            sName: store.sName,
        }

        localStorage.setItem('store', JSON.stringify(state.store))

        state.facture.iStoreID = state.store.iID

        // dar halati ke store radifi off mibashad / baste be tanzimat anbar sharti mishavad
        state.facture.stuffs.forEach(stuff => {
            stuff.iStoreID = state.store.iID
        })
    },
    // give and set all stuffs
    SET_STUFFS(state, stuffs) {
        state.stuffs = stuffs
    },
    SET_FILTERS(state, filters) {
        state.stuffSearchKey = filters[0]
        state.stuffsStock = filters[1]
        console.log(state.stuffsStock)
    },
    SET_STUFF_FIRST_CLASS(state, stuffFirstClassGroup) {
        state.stuffFirstClassGroup = stuffFirstClassGroup
    },
    SET_STUFF_SECOND_CLASS(state, stuffSecondClassGroup) {
        state.stuffSecondClassGroup = stuffSecondClassGroup
    },
    SET_STUFF_THIRD_CLASS(state, stuffThirdClassGroup) {
        state.stuffThirdClassGroup = stuffThirdClassGroup
    },
}

export const actions = {
    async fetchFactureNumMax({ commit, state }) {
        const factureNumMax = await EventService.getMaxFactorNum(
            state.facture.iType
        )
        commit('SET_FACTURE_NUM', factureNumMax.data.iNum)
    },
    // fetch persons and call set
    async fetchPersons({ commit }, personSearchKey) {
        commit('LOADING_', null, { root: true })
        try {
            const persons = await EventService.getPersons(personSearchKey)
            commit('SET_PERSONS', persons.data)
            commit('LOADING_', null, { root: true })
        } catch {}
    },
    // select person and call set
    setPerson({ commit }, person) {
        commit('SET_PERSON', person)
    },
    // fetch stores and call set
    async fetchStores({ commit, dispatch }, storeSearchKey) {
        commit('LOADING_', null, { root: true })
        try {
            const stores = await EventService.getStores(storeSearchKey)
            commit('SET_STORES', stores.data)
            commit('LOADING_', null, { root: true })
            dispatch('fetchStuffs')
        } catch {}
    },
    // select store and call set
    setStore({ commit, dispatch }, store) {
        commit('SET_STORE', store)
        dispatch('fetchStuffs')
    },
    // fetch stuffs and call set
    async fetchStuffs({ commit, state }, stuffSearchKey, stuffsStock) {
        commit('LOADING_', null, { root: true })

        if (stuffSearchKey.length <= 0 || stuffSearchKey == undefined)
            stuffSearchKey = ''
        if (stuffsStock < 0 || stuffsStock == undefined) stuffsStock = 0
        const filters = [stuffSearchKey, stuffsStock]
        commit('SET_FILTERS', filters)
        console.log(filters)

        try {
            const stuffs = await EventService.getStuffsStore(
                state.store.iID,
                stuffSearchKey,
                stuffsStock
            )
            commit('SET_STUFFS', stuffs.data)
            commit('LOADING_', null, { root: true })
        } catch {}
    },
    // fetch stuff first class group
    async fetchStuffFirstClass({ commit }) {
        const stuffFirstClassGroup = await EventService.getStuffFirstClass()
        commit('SET_STUFF_FIRST_CLASS', stuffFirstClassGroup.data)
    },
    // fetch stuff second class group
    async fetchStuffSecondClass({ commit }, iFirstClassID) {
        const stuffSecondClassGroup = await EventService.getStuffSecondClass(
            iFirstClassID
        )
        commit('SET_STUFF_SECOND_CLASS', stuffSecondClassGroup.data)
    },
    // fetch stuff third class group
    async fetchStuffThirdClass({ commit }, iFirstClassID, iSecondClassID) {
        const stuffThirdClassGroup = await EventService.getStuffThirdClass(
            iFirstClassID,
            iSecondClassID
        )
        commit('SET_STUFF_THIRD_CLASS', stuffThirdClassGroup.data)
    },
}

export const getters = {
    storeID: state => state.store.iID,
    factureNumber: state => state.factureNumber,
}

// computed: {
//   message: {
//     get () {
//       return this.$store.state.obj.message
//     },
//     set (value) {
//       this.$store.commit('updateMessage', value)
//     }
//   }
// }