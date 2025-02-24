"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormItem,
   FormField,
   FormLabel,
   FormControl,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, } from "@/components/ui/button";
import { EmailFormData, emailSchema, WaitListFormData, waitListSchema } from "@/lib/schema";
import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export default function WaitListForm() {
   // const dispatch = useAppDispatch()
   // const { email, isModalOpen } = useAppSelector((state) => state)
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [email, setEmail] = useState<string>("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   //Email form
   const emailForm = useForm<EmailFormData>({
      resolver: zodResolver(emailSchema),
      mode: "onSubmit",
      defaultValues: {
         email: "",
      }
   })

   // Final waitlist form
   const waitListForm = useForm<WaitListFormData>({
      resolver: zodResolver(waitListSchema),
      mode: "onSubmit",
      defaultValues: {
         firstName: "",
         lastName: "",
         company: "",
         email: email,
         role: "",
      }
   });

   const onEmailSubmit = async (data: EmailFormData) => {
      setIsSubmitting(true)
    try {
      // dispatch(setEmail(data.email))
      setEmail(data.email)
      console.log("Submitted data:", {...data})
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      // dispatch(setModalOpen(true))
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
   }

   const onWaitListSubmit = async (data: WaitListFormData) => {
      setIsSubmitting(true)
      try {
         // Add your API call here
         await new Promise((resolve) => setTimeout(resolve, 1000))
         console.log("Submitted data:", {...data})
         setIsModalOpen(true)
         // dispatch(setModalOpen(false))
         // dispatch(resetForm())
         emailForm.reset()
         waitListForm.reset()
      } catch (error) {
         console.error("Error submitting form:", error)
      } finally {
         setIsSubmitting(false)
      }
   }

   useEffect(() => {
    waitListForm.setValue("email", email, { shouldValidate: true });
  }, [waitListForm, email]);

   return(
    <div className="w-full max-w-md md:max-w-lg mx-auto px-4 mt-12">
      <Form {...emailForm}>
         <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}  className="flex items-center p-1.5 bg-white shadow-[0px_0px_41px_6px_rgba(34,_162,_98,_0.15)] rounded-full border">
            <FormField
               name="email"
               control={emailForm.control}
               render={({field})=>(
                  <FormItem className="flex-1">
                     <FormControl>
                        <Input
                        type="email"
                        placeholder="Enter a valid work email"
                        {...field}
                        className="flex-1 border-0 bg-transparent rounded-full text-base placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                     </FormControl>
                     {/* <FormMessage className="absolute mt-2 ml-4" /> */}
                  </FormItem>
               )}
            />
            <Button type="submit" size={"lg"} className="rounded-full px-4 shadow-[0px_0px_41px_6px_rgba(34,_162,_98,_0.15)]" disabled={isSubmitting}>
               {isSubmitting ? (
               "Please wait..."
               ) : (
               <>
                  Join Beta <ArrowRight className="ml-2 h-5 w-5" />
               </>
               )}
            </Button>
         </form>
      </Form>
      
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            // dispatch(setModalOpen(false))
            setIsModalOpen(false)
          }
        }}
      >
        <DialogContent className="overflow-y-auto max-h-[95vh] p-6">
          <DialogHeader>
            <DialogTitle>Complete your waitlist registration</DialogTitle>
            <DialogDescription>Please provide additional information to join our waitlist.</DialogDescription>
          </DialogHeader>
          <Form {...waitListForm}>
            <form onSubmit={waitListForm.handleSubmit(onWaitListSubmit)} className="space-y-4 flex flex-col gap-0 w-full">
              <FormField
                control={waitListForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        //   dispatch(updateForm({ name: e.target.value }))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        //   dispatch(updateForm({ company: e.target.value }))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        //   dispatch(updateForm({ role: e.target.value }))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                        //   dispatch(updateForm({ name: e.target.value }))
                        }}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={
                          field.onChange
                        }
                        defaultValue={
                            field.value
                        }
                      >
                        <FormControl>
                          <SelectTrigger autoFocus={true}>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {roles.map(
                                (role) => (
                                    <SelectItem
                                        key={
                                            role.id
                                        }
                                        value={
                                            role.id
                                        }>
                                        {
                                            role.name
                                        }
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                Join WaitList
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
   )
  
}

const roles = [
  {
      name: "CEO",
      id: "CEO",
  },
  {
      name: "CFO",
      id: "CFO",
  },
  {
      name: "CRO",
      id: "CRO",
  },
  {
      name: "Head of finance",
      id: "HEAD_OF_FINANCE",
  },
  {
      name: "Financial controller",
      id: "FINANCIAL_CONTROLLER",
  },
  {
      name: "Procurement",
      id: "PROCUREMENT",
  },
  {
      name: "Manager",
      id: "MANAGER",
  },
  {
      name: "Employee",
      id: "EMPLOYEE",
  },
  {
      name: "Others",
      id: "OTHERS",
  },
];

