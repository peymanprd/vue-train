/* 
global state is here
*/
import { mapGetters } from 'vuex'

export const userPermision = {
    ...mapGetters('user', ['userPermision']),
}
