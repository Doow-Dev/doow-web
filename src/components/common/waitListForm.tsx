"use client"
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormData, emailSchema, WaitListFormData, waitListSchema } from "@/lib/schema";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import customToast from "./customToast";
import { useWaitListContext } from "@/lib/contexts/WaitlistContext";

export default function WaitListForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isWaitListOpen, setIsWaitListOpen, email, setEmail} = useWaitListContext();
  const localRef = useRef<HTMLInputElement | null>(null);
  //Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  // Final waitlist form
  const waitListForm = useForm<WaitListFormData>({
    resolver: zodResolver(waitListSchema),
    mode: "onSubmit",
    defaultValues: {
      first_name: "",
      last_name: "",
      company_name: "",
      email: email ? email : "",
      position: "",
    },
  });

  const position = waitListForm.watch("company_name") || 'your company';

  const onEmailSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      setEmail(data.email);
      setIsWaitListOpen(true);
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
      emailForm.reset()
    }
  }

  const onWaitListSubmit = async (data: WaitListFormData) => {
    setIsSubmitting(true);

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company_name: data.company_name,
      email: email,
      role: data.position,
    };

    try {
      const response = await axios.post("https://api.doow.co/waitlist", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response.data)
      customToast.success({ title: "Successfully registered!" });
      setIsSubmitting(false);
      setIsWaitListOpen(false);
      waitListForm.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      customToast.error({ title: error.response?.data.message });
      console.log(error.response.data)
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    waitListForm.setValue("email", email);
  }, [waitListForm, email]);

   return(
    <div className="w-full max-w-md md:max-w-lg mx-auto mt-8 md:mt-12">
      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          className="sm:p-1.5 sm:bg-white sm:shadow-[0px_0px_41px_6px_rgba(34,_162,_98,_0.15)] sm:rounded-full sm:border rounded-xl sm:flex sm:flex-row space-x-1 sm:space-x-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 w-full relative">
            <FormField
              name="email"
              control={emailForm.control}
              render={({ field }) => (
                <FormItem className="sm:flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter a valid work email"
                      {...field}
                      ref={localRef}
                      className=" w-full bg-white sm:bg-transparent rounded-full text-base text-center sm:text-left focus-visible:ring-0 focus-visible:bg-muted"
                    />
                  </FormControl>
                  <FormMessage className="absolute text-[10px] sm:text-sm top-28 sm:top-12 ml-4" />
                </FormItem>
              )}
            />
            <Button type="submit" size={"lg"} className="rounded-full px-4 bg-doow_primary shadow-[0px_0px_41px_6px_rgba(34,_162,_98,_0.15)] ml-0 sm:ml-4" disabled={isSubmitting}>
               {isSubmitting ? (
               "Please wait..."
               ) : (
               <>
                  Join Beta <ArrowRight className="ml-2 h-5 w-5" />
               </>
               )}
            </Button>
          </div>
        </form>
      </Form>
      
      <Dialog
        open={isWaitListOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsWaitListOpen(false)
          }
        }}
      >
        <DialogContent className="overflow-y-auto scrollbar-hidden hover:scrollbar-default max-h-[95vh] p-11 space-y-4">
          <DialogHeader className="space-y-1">
            <div className="opacity-70 bg-doow_card text-doow_primary p-2 rounded-full w-fit-content mx-auto">
              <BadgeCheck className="h-8 w-8"/>
            </div>
            <DialogTitle className="text-xl text-center text-doow_zinc mt-8">Join our waitlist</DialogTitle>
            <DialogDescription >
              Please provide additional information to join our waitlist.
            </DialogDescription>
          </DialogHeader>
          <Form {...waitListForm}>
            <form onSubmit={waitListForm.handleSubmit(onWaitListSubmit)} className="space-y-4 flex flex-col gap-0 w-full">
              <FormField
                control={waitListForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        placeholder="Enter your first name"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        placeholder="Enter your last name"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        {...field}
                        placeholder="Enter a company name"
                        onChange={(e) => {
                          field.onChange(e);
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
                        placeholder="Enter a valid work email"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={waitListForm.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="transition-all">{`What do you do at ${position}?`}</FormLabel>
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select a position" />
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
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-doow_primary"
                disabled={isSubmitting || !waitListForm.formState.isValid}
              >
                {isSubmitting ? (
                  <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  "I'm in 🤝"
                )}
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

