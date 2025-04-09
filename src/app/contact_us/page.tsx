'use client'
import React, { useState } from "react";
import {TopSection } from "../_components/terms-privacy";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { useForm } from "react-hook-form";
import { ContactUsFormData, contactUsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BadgeCheck, Mail, Phone } from "lucide-react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  variable: "--font-poppins",
})

export default function ContactUs() {
    const [showSuccessfull, setshowSuccessfull] = useState(false);
    // Contact us form
    const contactUsForm = useForm<ContactUsFormData>({
        resolver: zodResolver(contactUsSchema),
        mode: 'onSubmit',
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            comments: ""
        }
    })
    const onContactUsSubmit = async () => {
        try {
            setshowSuccessfull(true);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          contactUsForm.reset();
        }
    };
    const name = contactUsForm.watch("first_name")
  return (
    <div className="w-full bg-doow_offwhite">
        <Header/>
        <TopSection
            title={"Contact Us"}
            subtitle={" Send us a message and someone will be in touch shortly."}
            icon={<Mail className="h-8 w-8"/>}
        />

        <MaxWidthWrapper className="relative py-20">
            <div className="text-left w-full max-w-md md:max-w-lg mx-auto  bg-white p-12 rounded-2xl shadow-lg">
                {/* <h2 className={`${poppins.className} text-center font-semibold  text-xl text-black`}>
                    Provide your additional details and drop <br /> us a message anytime
                </h2> */}
                <div className="opacity-70 bg-doow_card text-doow_primary p-2 rounded-full w-fit mx-auto">
                    <Phone className="h-8 w-8"/>
                </div>
                <p className={`${poppins.className} text-center text-sm text-muted-foreground mt-3`}>
                    Provide your additional details and drop <br /> us a message anytime
                </p>
                <div className="mt-6">
                    <Form {...contactUsForm}>
                        <form
                                onSubmit={contactUsForm.handleSubmit(onContactUsSubmit)}
                                className="space-y-4 flex flex-col gap-0 w-full"
                            >
                                <FormField
                                    control={contactUsForm.control}
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
                                    control={contactUsForm.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
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
                                    control={contactUsForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Work Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                className="bg-muted"
                                                {...field}
                                                placeholder="Enter a valid work email"
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
                                    control={contactUsForm.control}
                                    name="comments"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comments</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="bg-muted h-40"
                                                    {...field}
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                    placeholder="Your comments here"
                                                /> 
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-full bg-doow_primary"
                                    disabled={!contactUsForm.formState.isValid}
                                >
                                    Send message 🤝
                                </Button>
                        </form>
                    </Form>
                    <Dialog
                        open={showSuccessfull}
                        onOpenChange={(open) => {
                            if (!open) {
                            setshowSuccessfull(false)
                            }
                        }}
                    >
                        <DialogContent className="text-center space-y-4">
                            <DialogHeader className="space-y-3">
                                <div className="opacity-70 bg-doow_card text-doow_primary p-2 rounded-full w-fit-content mx-auto">
                                    <BadgeCheck className="h-8 w-8"/>
                                </div>
                                <DialogTitle className="text-sub-heading">{`Thank you ${name}`}</DialogTitle>
                                <DialogDescription>
                                    You are now on the waitlist. We can&apos;t wait to show you what
                                    Cross-border business banking should feel like.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogTitle>
                                You are the first in line.
                            </DialogTitle>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </MaxWidthWrapper>
        <Footer/>
    </div>
  );
}