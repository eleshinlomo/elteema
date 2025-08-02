'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useContext, useState, useEffect, Suspense } from "react";
import { GeneralContext } from "../../../contextProviders/GeneralProvider";
import { getLocalUser, updateLocalUser } from "../../../components/utils";
import { persistLogin, verifyCode } from "../../../components/api/auth";
import ScrollTopButton from "../../../components/scrollTopButton";
import MobileFooter from "../../../components/mobileFooter";
import Footer from "../../../components/footer";
import OldNavBar from "../../../components/header/oldNavbar";
import { updateCart } from "../../../components/api/cart";
import LoadingState from "../../../components/LoadingState";

interface AllRoutesProps {
  children: React.ReactNode;
}

const AllroutesLayout = ({ children }: AllRoutesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const code = searchParams.get("code");
  const email = searchParams.get("email");

  const { setIsLoggedIn, setUser } = useContext(GeneralContext);

  // Handle one-time verification from query params (magic link login)
  const handleVerify = async (code: string, email: string) => {
    try {
      const data: any = await verifyCode(code, email);

      if (data.ok) {
        const verifiedUser = data.data;
        const existingUser = getLocalUser();
        const existingCart = existingUser?.cart || [];
        const serverCart = verifiedUser?.cart || [];

        // Merge guest cart and user cart
        const mergedCart = [...existingCart, ...serverCart];
        if (verifiedUser._id) {
          await updateCart(verifiedUser._id, mergedCart);
        }

        const updatedUser = { ...verifiedUser, cart: mergedCart, isLoggedIn: true };
        updateLocalUser(updatedUser);
        setUser(updatedUser);
        setIsLoggedIn(true);
        router.push("/");
      }
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle persistent login from localStorage
  const verifyPersistentLogin = async () => {
    try {
      const localUser = getLocalUser();

      if (localUser?.authCode && localUser?.email) {
        const result = await persistLogin(localUser.authCode, localUser.email);
   

        if (result.ok) {
         
          updateLocalUser(result.data);
          setUser(result.data);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    } catch (err) {
      console.error("Persistent login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // First check if URL has code/email, else check persistent login
    if (code && email) {
      handleVerify(code, email);
    } else {
      verifyPersistentLogin();
    }
  }, [code, email]); // Only run once on mount

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <Suspense>
      <div>
        <OldNavBar />
        {children}
        <ScrollTopButton />
        <MobileFooter />
        <div className="hidden md:block">
          {!pathname.startsWith("/dashboard") && <Footer />}
        </div>
      </div>
    </Suspense>
  );
};

export default AllroutesLayout;
