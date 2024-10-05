
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState, } from "react";

import { auth } from "../Config/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const googleProvider = new GoogleAuthProvider();


    // google login  
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }



    // email varification 

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Send email verification
            await sendEmailVerification(user);
            toast.success("Verification email sent! Please check your inbox.");

            setUser(user);
            return user
        } catch (error) {
            setLoading(false);
            toast.error("Failed to create user");
            console.error("Error creating user:", error);
            throw error;
        }
    };

    //  profile update fn
    const handleUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo

        })
    }




    //   loging  Account 
    // const signin = (email, password) => {
    //     setLoading(true)
    //     return signInWithEmailAndPassword(auth, email, password)
    // }




    const signin = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if email is verified
            if (!user.emailVerified) {
                throw new Error("Please verify your email before logging in.");
            }

            return user;
        } catch (error) {
            setLoading(false);
            if (error.message.includes("verify your email")) {
                toast.error("Please verify your email before logging in.");
            } else {
                toast.error("Failed to sign in. Please check your credentials.");
            }
            console.error("Error signing in:", error);
            throw error;
        }
    };


    //   logOut account 
    const logOut = () => {
        return signOut(auth);

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            setUser(currentUser);
            setLoading(false);

            const handleCreateToken = async () => {
                const email = { email: userEmail };
                await axiosPublic.post("/jwt", email, {
                    withCredentials: true,
                });
            };
            handleCreateToken();

        });
        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);


    const authInformatiopn = {
        googleLogin,
        createUser,
        user,
        signin,
        logOut,
        loading,
        handleUpdateProfile,
    }

    return (
        <AuthContext.Provider value={authInformatiopn}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthProvider;

