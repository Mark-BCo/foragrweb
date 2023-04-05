import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/home/Home'
import Partners from './components/header/Partners'
import PersistLogin from './features/auth/PersistLogin'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import ProRegister from './features/auth/ProRegister'
import Preference from './features/auth/Preference'
import Learn from './features/tools/plants/Learn'
import Map from './features/tools/map/Map'
import MapForm from './features/tools/map/MapForm'
import Admin from './features/auth/Admin'
import UsersList from './features/users/usersList'
import ProsList from './features/users/ProsList'
// import UserProfile from './features/users/profile/Users'
import UsersProfileList from './features/users/profile/UsersList'
import PlantCard from './features/tools/plants/PlantCard'
import PlantFinal from './features/tools/plants/PlantFinal'
import EditPros from './features/users/edit/EditPros'
import EditUser from './features/users/edit/EditUser'
import NewUserForm from './features/users/new/NewUserForm'
import NewProsForm from './features/users/new/NewProsForm'
import RequireAuth from './features/auth/RequireAuth'
import Prefetch from './features/auth/Prefetch'
import { ROLES } from './config/roles'
import React from "react"
import useTitle from './hooks/useTitle'

function App() {

  useTitle('Foragr')

  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path='Partners' element={<Partners />} />
        <Route path="Register" element={<Register />} />
        <Route path="ProRegister" element={<ProRegister />} />
        <Route path="Login" element={<Login />} />
        <Route path="Preference" element={<Preference />} />


        <Route element={<PersistLogin />} >
          <Route path="Learn" element={<Learn />} />
          <Route path="PlantCard" element={<PlantCard />} />
          <Route path="PlantResult" element={<PlantFinal />} />
          <Route path="Map" element={<Map />} />
          <Route path="MapForm" element={<MapForm />} />
        </Route>


        {/* Create a Persistant Login Component [x] */}
        {/* protected Routes */}
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />} >
              <Route path="dash" element={<Admin />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin, ROLES.User, ROLES.Professional]} />}>
                <Route path="dash/users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>
                
                <Route path="dash/pros">
                  <Route index element={<ProsList />} />
                  <Route path=":id" element={<EditPros />} />
                  <Route path="new" element={<NewProsForm />} />
                </Route>
              
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Professional]} />}>
                <Route path="dash/userprofile">
                  <Route index element={<UsersProfileList />} />
                  <Route path=":id" element={<EditUser />} />
                </Route>
              </Route>

            </Route>
          </Route>
        </Route> {/* End protected routes*/}
      </Route>
    </Routes >
  );
}

export default App;
