"use client";
import react from "react";
import { useEffect, useState } from "react";
import { singIn, singOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const isUserLogined = true;

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between flex w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center ">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          alt="promptopia"
          height={30}
          className="object-contain"
        />

        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
        {isUserLogined ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={singOut} className="outline_btn">
              sing out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                height={30}
                width={30}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => singIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative ">
        {isUserLogined ? (
          <>
            <div className="flex">
              <Image
                src="/assets/images/logo.svg"
                height={30}
                width={30}
                alt
                onClick={() => setToggleDropDown((prevState) => !prevState)}
              />

              {toggleDropDown && (
                <>
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Create Prompt
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropDown(false);
                        singOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => singIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
