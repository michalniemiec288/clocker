import Firebase from '../utils/firebase'
export default (pathArray) => pathArray.map(path => Firebase.getRef(path).set(true))
