import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function useLogin() {
    const { isPending , error , mutate } = useMutation({
        mutationFn: async ( { email , password } :{email: string , password: string} ) => {
            const response = await signIn( 'credentials' , {
                email, 
                password, 
                redirect: false
            }) 

            if (!response?.ok) {
                throw new Error(response?.error || "something went Wrong")
            }

            return response
        }, 
        onSuccess: ( data ) => {
            toast.success("login succsfuly")
            setTimeout(() => {
                window.location.href = data?.url || '/'
            }, 1000);
        },
        // onError: (error) => {
        //     toast.error(error.message)
        // }
    })

    return { isPending , error , login: mutate }
}