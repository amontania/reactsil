import {Routes,Route } from 'react-router-dom';
import SigninForm from './_auth/forms/SiginForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/_root/pages";
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import RentalBooks from './_root/pages/Prestamos/RentalBooks';
import PostForm from './components/forms/PostForm';
import ClientAutocomplete from './_root/pages/Prestamos/buscar';
import { useState } from 'react';






function App() {


  return (
    <main className='flex h-screen'>
    <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm  />} />
            <Route path='/signup' element={<SignupForm  />} />
        </Route>

        {/* Privates Routes */}
        <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<PostForm action={'Create'} />} />
            <Route path="/all-users" element={<p></p> } />
            <Route path="/create-post" element={<RentalBooks />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      
    </Routes>
    <Toaster />
    </main>
  )
}

export default App