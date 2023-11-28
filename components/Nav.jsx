"use client"
//for using client based functionalities such as hooks
import Link from "next/link"
//this allow us to move to other pages of our application
import Image from 'next/image';
//automatically optimize the images for us
import { useState , useEffect} from 'react';
//still using reactfunctional component and hooks
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
//these utility function are going to make signin and signup flow incredibly


const Nav = () => {
    // to mark the state of a user being logged in or not we create new variable
    const isUserLoggedIn = true;
    //initializing providers
    const [providers, setProviders ] = useState(null);
    //setting those providers using useeffect hook , 
    //that has a callback function and only runs at the start

    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            //once we get response we can simply set providers to our state equals to response
            setProviders(response);
        }
        //calling setproviders
        setProviders();
        //this going to allow sign in using google and next auth


    } , [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link  href="/"  className="flex gap-2 flex-center">
        <Image 
        src="/assets/images/logo.svg"
        alt = "YourPrompt Logo"
        width={30}
        height={30}
        className="object-contain"
        />
        <p className="logo_text">Your Prompt</p>
        </Link>

        {/* Desktop Navigation 
        on small devices it going to be flex(visible),
          going to be hidden for extra small devices*/}
        <div className="sm:flex hidden">
           {isUserLoggedIn ? (
            //gap-5 for medium devices
            <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt"
                className="black_btn">
                Create Post
                </Link>

                <button type="button" onClick={signOut} className="outline_btn">
                 Sign Out
                </button>

                <Link href="/profile">
                    <Image 
                      src ="/assets/images/logo.svg"
                      width={37}
                      height={37}
                      className="rounded-full"
                      alt="profile"
                    />
                    
                </Link>
            </div>
            //for user not logged in we can have button to sign in
            //and to do that using nextauth we must access to providers
           ):  (
            <>
            {/* opening new dynamic block of code and check access to providers*/}
            {providers &&
            // for access to providers
                Object.values(providers).map((provider) => (
                    //returning button for each provider
                    //we will be using one provider i.e googleauth
                    <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                    >
                        Sign In
                    </button>
                ))}
            </>
           

           )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    <Image 
                      src ="/assets/images/logo.svg"
                      width={37}
                      height={37}
                      className="rounded-full"
                      alt="profile"
                    //onclick property for dropdown in mobile navbar
                    //inside settoggledropdown state we use callback function  to opposite of prev state current value
                    onClick={() => setToggleDropdown((prev)=> !prev)
                     }
                    />
                    {toggleDropdown && (
                        //for toggledropdown true
                        <div className="dropdown">
                            <Link
                            href="/profile"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown
                            (false)}
                            >
                                My Profile  
                            </Link>
                            </div>
                    )}
                    </div>
            ): (
                <>
            {/* opening new dynamic block of code and check access to providers*/}
            {providers &&
            // for access to providers
                Object.values(providers).map((provider) => (
                    //returning button for each provider
                    //we will be using one provider i.e googleauth
                    <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                    >
                        Sign In
                    </button>
                    // to make this button open up a menu for this we create new usestate toggledropdown
                ))}
            </>

           )}

        </div>

    </nav>
  )
}

export default Nav