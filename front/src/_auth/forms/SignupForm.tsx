import { Link,useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
// import { createUserAccount } from "@/lib/appwrite/api";
import { SignupValidation } from "@/lib/validation";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";



const SignupForm = () => {

  console.log("vino");

  const { toast } = useToast()

  const {checkAuthUser,isLoading:isUserLoading} = useUserContext();

  const navigate = useNavigate();

  const {mutateAsync: createUserAccount,isPending : isCreatingAccount } = useCreateUserAccount();

  const {mutateAsync: signInAccount,isPending : isSigningInUser } = useSignInAccount();

 
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation), defaultValues: { 
      name:"",
      username: "",
      email:"",
      password:"" },
   })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
 
    const newuser =await createUserAccount(values);
    if(!newuser){
      return toast({title:"Sign up failed.Please try again"});
    }

    const session = await signInAccount({email:values.email,
      password:values.password});

    if(!session){
      return toast({title:"Sign in failed. Please try again"});
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
   }else{
     return toast({title:"Sign in failed. Please try again"});
   }

  }

  return (
       <Form {...form}>
        <div className="sm:w-420 flex-center flex-col"> 
         <img src="/assets/images/logo.svg" alt="logo"/>
         <h2 className="h3-bold md:h2-bold pt-5 sd: pt-12">Crear una cuenta</h2>
         <p className="text-light-3 small-medium md:base-regular mt-2">Para usar silonline coloca tus datos abajo por favor</p>
       
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5  mt-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
            { isCreatingAccount || isSigningInUser || isUserLoading ? (<div className="flex-center gap-2">
              <Loader/> Loading...
            </div>): "Crear cuenta"}
              </Button>
              <p className="text-small-regular text-light-2 text-center mt-2">
               Ya tienes una cuenta <Link to="/sign-in" className="text-primary-500 text-small-semibold  ml-1">Ingresar</Link>
              </p>
          </form>
          </div>
    </Form>
   
  )
}

export default SignupForm