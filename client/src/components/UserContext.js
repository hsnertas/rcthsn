import React , { useContext } from 'react'
import fire from '../config/fire'

const UserContext = React.createContext({
    user: null
});

export default UserContext;



